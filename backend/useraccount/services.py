import os
import requests
import base64
import hmac
import hashlib

def send_transactional_email(email, data_variables):

    payload = {
        "transactionalId": os.getenv("OTP_TRANSACTION_ID"),
        "email": email,
        "dataVariables": data_variables
    }
    try:
        response = requests.post(
            "https://app.loops.so/api/v1/transactional",
            json=payload,
            headers={
                "Authorization": f"Bearer {os.getenv('LOOPS_API_KEY')}",
                "Content-Type": "application/json"
            }
        )

        response.raise_for_status()
        
        if response.status_code == 200:
            return {"message": "The email has been sent successfully."}
        else:
            return {"error": f"Unexpected status code: {response.status_code}", "details": response.text}
    
    except requests.exceptions.RequestException as e:
        return {"error": str(e), "details": getattr(e.response, 'text', 'No response text')}
    

