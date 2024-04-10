from pydantic import BaseModel

class LoginRequest(BaseModel):
    username: str
    password: str

class UserCreate(BaseModel):
    username: str
    password: str

class User(BaseModel):
    id:int
    username: str
    hashed_password: str
    # is_active: bool
    
    class Config:
        orm_mode = True