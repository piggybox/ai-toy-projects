####################################################
# A demonstration of multi-engine LLM query interface
####################################################

# Setup

from helper import get_openai_api_key

OPENAI_API_KEY = get_openai_api_key()

import nest_asyncio

nest_asyncio.apply()


# Load data
from llama_index.core import SimpleDirectoryReader

documents = SimpleDirectoryReader(input_files=["input/metagpt.pdf"]).load_data()


# Define LLM and embedding model
from llama_index.core.node_parser import SentenceSplitter

splitter = SentenceSplitter(chunk_size=1024)
nodes = splitter.get_nodes_from_documents(documents)

from llama_index.core import Settings
from llama_index.llms.openai import OpenAI
from llama_index.embeddings.openai import OpenAIEmbedding

Settings.llm = OpenAI(model="gpt-3.5-turbo")
Settings.embed_model = OpenAIEmbedding(model="text-embedding-ada-002")


# Define summary index and vector index
from llama_index.core import SummaryIndex, VectorStoreIndex

summary_index = SummaryIndex(nodes)
vector_index = VectorStoreIndex(nodes)


# Define query engine
summary_query_engine = summary_index.as_query_engine(
    response_mode="tree_summarize",
    use_async=True,
)
vector_query_engine = vector_index.as_query_engine()

from llama_index.core.tools import QueryEngineTool

summary_tool = QueryEngineTool.from_defaults(
    query_engine=summary_query_engine, description="Useful to summarize"
)

vector_tool = QueryEngineTool.from_defaults(
    query_engine=vector_query_engine, description="Useful to retrieve specific context"
)


# Define router query engine
from llama_index.core.query_engine.router_query_engine import RouterQueryEngine
from llama_index.core.selectors import LLMSingleSelector  # Pydantic selector?

query_engine = RouterQueryEngine(
    selector=LLMSingleSelector.from_defaults(),
    query_engine_tools=[summary_tool, vector_tool],
    verbose=True,
)

response = query_engine.query("What is the summary of the document?")
print(str(response))

# print(len(response.source_nodes))

response = query_engine.query("How do agetns share information with other agetns?")
print(str(response))
