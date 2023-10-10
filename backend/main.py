from fastapi import Response, FastAPI, HTTPException, Depends, HTTPException, Body,File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
from create_send_req import send_req_sign
from get_sign import get_signature_request

load_dotenv()

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

username=os.getenv("DROPBOX_KEY")
# cookie_params = CookieParameters()

# cookie = SessionCookie(
#     cookie_name="cookie",
#     identifier="general_verifier",
#     auto_error=False,
#     secret_key="VERYSECRETKEY...",
#     cookie_params=cookie_params,
# )


# session_backend = InMemoryBackend[UUID, SessionData]()


# verifier = BasicVerifier(
#     identifier="general_verifier",
#     auto_error=True,
#     backend=session_backend,
#     auth_http_exception=HTTPException(
#         status_code=403, detail="invalid session"),
# )


@app.get("/")
def base_URL():
    return "Hello Dropbox from SignWave~!\n"

@app.post("/tags")
def tag_parser(prompt: str):
    """
    Fetches the prompt from front-end and executes the functions
    based on the tags returned by gpt_parser
    
    tags:
        - newsig -> request new signature, either from a url or file upload
        - checksig -> check status of signature request of a document
        - revunsig -> review unsigned signature requests sent by user
        - filtdocdate -> filter signed documents by date
        - rempeep -> remind people to sign a document
        
    params: prompt
    returns: None
    """
    # tags = gpt_parser(prompt)
    tags = []
    for tag in tags:
        if tag == "newsig":
            return "newsig"
    

@app.get("/signature")
def get_signature(username:str, sign_id: str):
    res = get_signature_request(username,sign_id)
    return res

@app.get("/list_signatures")
def list_signature():
    return "Hello Dropbox from SignWave~!\n"

@app.post("/verify")
def verify_sign():
    return "Hello Dropbox from SignWave~!\n"

@app.get("/create")
def create_document(doc_url: str, email: str, name: str):
    res = send_req_sign(doc_url,email,name)
    return res

