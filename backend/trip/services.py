import requests
from bs4 import BeautifulSoup
from langchain_openai import ChatOpenAI, OpenAI
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_community.callbacks import get_openai_callback
from useraccount.models import User, Prompts
import os
from datetime import datetime

def today_date():
    return datetime.now().strftime("%Y-%m-%d")  

def openai_call(human_message, system_message, user):

    llm = ChatOpenAI(model_name="gpt-4o-2024-05-13", temperature=0, api_key=os.getenv("OPENAI_API_KEY"))
    chat = llm

    with get_openai_callback() as cb:
        messages = [
            SystemMessage(content=f'{system_message}.'),
            HumanMessage(content=human_message),
        ]
        response = chat.invoke(messages)

        Prompts.objects.create(
            user=user,
            system_message=system_message,
            user_message=human_message,
            response=response.content,
            cost=cb.total_cost,
            input_tokens=cb.prompt_tokens,
            output_tokens=cb.completion_tokens
        )

        return response.content

def fetch_airbnb_page(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    try:
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
    except requests.RequestException as e:
        raise Exception(f"Failed to fetch page: {str(e)}")
    
    soup = BeautifulSoup(response.text, 'html.parser')
    
    title = soup.find('h1', {'class': '_fecoyn4'})
    title = title.text if title else 'Unknown'
        
    images = [img['src'] for img in soup.find_all('img', {'class': '_6tbg2q'}) if 'src' in img.attrs]
    
    country = soup.find('meta', {'property': 'og:country-name'})
    country = country['content'] if country else 'Unknown'
    
    city = soup.find('meta', {'property': 'og:locality'})
    city = city['content'] if city else 'Unknown'
    
    price = soup.find('span', {'class': '_tyxjp1'})
    price = price.text if price else 'Unknown'
    
    rating = soup.find('span', {'class': '_12si43g'})
    rating = rating.text if rating else 'No ratings yet'
    
    return {
        'title': title,
        'images': images,
        'country': country,
        'city': city,
        'price': price,
        'rating': rating
    }

def fetch_airbnb_data(api_url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    try:
        response = requests.get(api_url, headers=headers, timeout=10)
        response.raise_for_status()
    except requests.RequestException as e:
        raise Exception(f"Failed to fetch data: {str(e)}")
    
    return response.json()