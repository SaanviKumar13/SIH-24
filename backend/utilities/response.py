from fastapi import Response
from json import dumps

class JSONResponse(Response):
    def __init__(self, content, status_code=200, **kwargs):
        super().__init__(
            content=dumps(content), status_code=200, media_type="application/json", **kwargs
        )