from ariadne import QueryType, MutationType
from uuid import uuid4
from db import Session
from models import Base, City, Country, Countrylanguage
from sqlalchemy import func

query = QueryType()
mutation = MutationType()

@query.field("countries")
def resolve_countries(src, info, filter):
    session = Session()
    name_like = filter['name'] if 'name' in filter else None
    code_is = filter['code'] if 'code' in filter else None
    select = country_select(session, filter['limit'], filter['offset'], filter['continent'], name_like, code_is)
    return select

@query.field("country_count")
def resolve_country_count(src, info, filter):
    session = Session()
    name_like = filter['name'] if 'name' in filter else None
    code_is = filter['code'] if 'code' in filter else None
    return country_with_filter(session, filter['continent'], name_like, code_is).count()

@query.field("country_cities")
def resolve_country_cities(src, info, code):
    session = Session()
    return session.query(City).filter(City.countrycode == code)

@mutation.field("new_city")
def resolve_new_city(src, info, city):
    session = Session()
    try:
        rid = session.query(func.max(City.id).label('maxid')).first()
        print(rid)
        city = City(id=rid.maxid+1, name=city['name'],district=city['district'],population=city['population'],countrycode=city['countrycode'])
        session.add(city)
        session.commit()
    except:
        session.rollback()
        raise

    return True

def country_select(session, limit, offset, continent, name_like=None, code_is=None):
    select = session.query(Country)\
        .join(City)\
        .join(Countrylanguage)

    sq = country_with_filter(session, continent, name_like, code_is)\
        .limit(limit).offset(offset).subquery()

    return select.join(sq,Country.code == sq.c.match_code)

def country_with_filter(session, continent, name_like, code_is):
    if code_is is not None:
        return session.query(Country.code.label('match_code'))\
            .filter(func.lower(Country.code) == func.lower(code_is))\
            .filter(Country.continent == continent)
                #.limit(limit).offset(offset).subquery()
    elif name_like is not None:
        return session.query(Country.code.label('match_code'))\
            .filter(Country.name.ilike('%'+name_like+'%'))\
            .filter(Country.continent == continent)
    else:
        return session.query(Country.code.label('match_code'))\
            .filter(Country.continent == continent)
    