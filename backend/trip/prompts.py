from .services import today_date

today_day = today_date()

generate_trip_data_prompt = f"""
Based on user description you MUST generate a trip detail information. 

The description MUST be short and concise. Make it emotionally engaging and informative.

It should be description from the 1st face: "I want to..", "Explore with me...", "Let's get experience together...".

The description MUST be in the following format:
```
{{
    "name": "<name>",
    "description": "<description>",
    "month": "<month>",
    "country": "<country>",
    "city": "<city>",
    "budget": "<budget (strictly integer value) per person || empty if user does not mention it>",
    "currency": "<currency (strictly value from the list) || USD by default>",
}}
```

Avaliable currencies:
- USD
- EUR
- GBP
- RUB
- KZT

In the motnh you can mention monthes in the format like "January"..., but if user does not mention it you MUST set it to "Flexible".

If user mention soon or later in next / this months — set month accordingly. Today day and month is {today_day}.


You MUST generate ONLY valid JSON without any additional text. ALWAYS. NEVER add ```json```. JUST give the JSON without any additional text or characters.
"""
