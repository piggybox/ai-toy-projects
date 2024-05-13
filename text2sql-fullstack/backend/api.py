from fastapi import FastAPI
from ai import generate_query
from mangum import Mangum
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
handler = Mangum(app)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/query")
async def query(prompt: str):
    query = generate_query(prompt)
    return {"query": query}
