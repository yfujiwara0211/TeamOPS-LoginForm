from sqlalchemy.orm import Session
from . import models, schemas


def get_user_by_name(db: Session, name: str):
    return db.query(models.User).filter(models.User.username == name).first()

def create_user(db: Session, user: schemas.UserCreate, hashed_password: str):  # hashed_password 引数を追加 , hushed_password: str
    db_user = models.User(username=user.username, hashed_password=hashed_password)  # hashed_password を指定してユーザーを作成
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user