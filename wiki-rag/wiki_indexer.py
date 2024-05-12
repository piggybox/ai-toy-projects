from llama_index.core import download_loader, VectorStoreIndex, ServiceContext
from llama_index.core.node_parser import SimpleNodeParser
import openai
from pydantic import BaseModel
from llama_index.program.openai import OpenAIPydanticProgram
from utils import get_apikey


# define the data model in pydantic
class WikiPageList(BaseModel):
    "Data model for WikiPageList"
    pages: list


def wikipage_list(query):
    openai.api_key = get_apikey()

    prompt_template_str = """
    Given the input {query}, 
    extract the Wikipedia pages mentioned after 
    "please index:" and return them as a list.
    If only one page is mentioned, return a single
    element list.
    """
    program = OpenAIPydanticProgram.from_defaults(
        output_cls=WikiPageList,
        prompt_template_str=prompt_template_str,
        verbose=True,
    )

    wikipage_requests = program(query=query)

    return wikipage_requests


def create_wikidocs(wikipage_requests):
    wikipediaReader = download_loader("WikipediaReader")()
    documents = wikipediaReader.load_data(pages=wikipage_requests)

    return documents


def create_index(query):
    global index
    wikipage_requests = wikipage_list(query)
    documents = create_wikidocs(wikipage_requests)
    parser = SimpleNodeParser.from_defaults(chunk_size=150, chunk_overlap=45)
    service_context = ServiceContext.from_defaults(node_parser=parser)
    index = VectorStoreIndex.from_documents(documents, service_context=service_context)

    return index


if __name__ == "__main__":
    query = "/get wikipages: paris, lagos, lao"
    index = create_index(query)
    print("INDEX CREATED", index)
