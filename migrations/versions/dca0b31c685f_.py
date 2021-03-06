"""empty message

Revision ID: dca0b31c685f
Revises: 8ec71599fe2d
Create Date: 2022-01-31 04:09:28.015657

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'dca0b31c685f'
down_revision = '8ec71599fe2d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('movie', sa.Column('id_cinema', sa.Integer(), nullable=True))
    op.drop_constraint('movie_id_movie_fkey', 'movie', type_='foreignkey')
    op.create_foreign_key(None, 'movie', 'cinema', ['id_cinema'], ['id'])
    op.drop_column('movie', 'id_movie')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('movie', sa.Column('id_movie', sa.INTEGER(), autoincrement=False, nullable=True))
    op.drop_constraint(None, 'movie', type_='foreignkey')
    op.create_foreign_key('movie_id_movie_fkey', 'movie', 'cinema', ['id_movie'], ['id'])
    op.drop_column('movie', 'id_cinema')
    # ### end Alembic commands ###
