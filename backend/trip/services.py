import requests
from bs4 import BeautifulSoup

def fetch_airbnb_page(url):
    response = requests.get(url)
    if response.status_code != 200:
        raise Exception(f"Failed to fetch page: {response.status_code}")
    
    soup = BeautifulSoup(response.text, 'html.parser')
    
    images = [img['src'] for img in soup.find_all('img') if 'src' in img.attrs]
    
    country = soup.find('meta', {'property': 'airbnb:country'})['content'] if soup.find('meta', {'property': 'airbnb:country'}) else 'Unknown'
    city = soup.find('meta', {'property': 'airbnb:city'})['content'] if soup.find('meta', {'property': 'airbnb:city'}) else 'Unknown'
    
    return {
        'images': images,
        'country': country,
        'city': city
    }