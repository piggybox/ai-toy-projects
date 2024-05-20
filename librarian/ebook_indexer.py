from llama_index.core import SimpleDirectoryReader
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from llama_index.core import VectorStoreIndex
from llama_index.llms.ollama import Ollama


def create_index():
    loader = SimpleDirectoryReader(
        input_dir="./test/",
        recursive=True,
        required_exts=[".epub"],
    )
    documents = loader.load_data()

    embedding_model = HuggingFaceEmbedding(model_name="BAAI/bge-small-en-v1.5")
    index = VectorStoreIndex.from_documents(
        documents,
        embed_model=embedding_model,
    )

    return index


if __name__ == "__main__":
    llama = Ollama(
        model="llama3",
        request_timeout=40.0,
    )

    resp = llama.complete("Who is Paul Graham?")
    print(resp)

    index = create_index()
    query_engine = index.as_query_engine(llm=llama)
    print(
        query_engine.query(
            "What are the titles of all the books available? Show me the context used to derive your answer."
        )
    )
