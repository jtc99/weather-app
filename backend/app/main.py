from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
from dotenv import load_dotenv
import httpx

load_dotenv() #reads the .env file and loads the environment variables
API_KEY = os.getenv("OPENWEATHER_API_KEY")

app = FastAPI()

class Query(BaseModel):
    q: str

@app.post("/weather")
async def get_weather(query: Query):
    if not API_KEY:
        raise HTTPException(status_code=500, detail="API key not configured")
    params = {"q": query.q, "appid": API_KEY, "units": "metric"}
    async with httpx.AsyncClient() as client:
        try:
            r = await client.get("https://api.openweathermap.org/data/2.5/weather", params=params)
            r.raise_for_status()
            return r.json()
        except httpx.HTTPStatusError as exc:
            # Upstream returned a non-2xx response (e.g. 401 for bad API key)
            status = exc.response.status_code if exc.response is not None else 502
            detail = exc.response.text if exc.response is not None else str(exc)
            raise HTTPException(status_code=status, detail=f"Upstream error: {detail}")
        except httpx.RequestError as exc:
            # Network/connection error when calling upstream
            raise HTTPException(status_code=502, detail=f"Upstream request failed: {exc}")