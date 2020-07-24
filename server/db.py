'''
This contains Database logic
'''

from datetime import datetime

from sqlalchemy import create_engine
from models import Base, City, Country, Countrylanguage
from sqlalchemy.orm import sessionmaker
from contextlib import contextmanager
import os

SQLALCHEMY_DATABASE_URI = os.environ['SQLALCHEMY_DATABASE_URI'] if 'SQLALCHEMY_DATABASE_URI' in os.environ else 'postgresql+psycopg2://test:test@localhost:5432/test'
print('Database at ' + SQLALCHEMY_DATABASE_URI)

engine = create_engine(SQLALCHEMY_DATABASE_URI)

'''
This "Session" export is the most important to bind everything together
'''
Session = sessionmaker(bind=engine)


@contextmanager
def session_scope():
    session = Session()
    try:
        yield session
        session.commit()
    except Exception:
        session.rollback()
        raise
    finally:
        session.close()


def recreate_database():
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)


if __name__ == '__main__':
    recreate_database()
    # add_data()
    with session_scope() as s:
        s.add(book)