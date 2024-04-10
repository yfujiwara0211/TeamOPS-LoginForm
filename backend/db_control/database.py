from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import sqlalchemy

# SQLALCHEMY_DATABASE_URL = "sqlite:///./Database_User.db"
SQLALCHEMY_DATABASE_URL = "sqlite:///./Database_User_hushed.db"

# user = 'user'
# password = 'password'
# host = 'host'
# database_name = 'user_db'
# engine = create_engine(f'mysql+mysqlconnector://{user}:{password}@{host}/{database_name}')

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = sqlalchemy.orm.declarative_base()