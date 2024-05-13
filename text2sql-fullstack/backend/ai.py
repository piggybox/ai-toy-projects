import os
from typing import List
import openai
import argparse
import re


TABLE_SCHEMA = """
    'employee_id' (integer)
    'first_name' (text)
    'last_name' (text)
    'salary' (integer)
    'department_id' (integer)
"""


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", "-i", type=str, required=True)
    args = parser.parse_args()
    user_input = args.input

    print(f"User input: {user_input}\n")
    generate_query(user_input)


def call_openai_api(prompt: str) -> str:
    openai.api_key = os.getenv("OPENAI_API_KEY")
    response = openai.Completion.create(
        model="text-davinci-003", prompt=prompt, temperature=0.6
    )

    return response.choices[0].text


def generate_query(prompt: str) -> str:
    enriched_prompt = f"""
        Given a database table schema with the following schema:
        
        {TABLE_SCHEMA} 
        
        Please provide an SQL query to find the answer to the question "{prompt}"
    """

    query: str = call_openai_api(enriched_prompt)
    # query: str = query.strip()

    print(f"generated query: {query}")
    return query


if __name__ == "__main__":
    main()
