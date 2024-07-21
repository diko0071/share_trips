import requests
from bs4 import BeautifulSoup

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