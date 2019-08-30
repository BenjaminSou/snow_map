"""
Flask template.
"""

import os
import psycopg2
import json
from flask import Flask, render_template, redirect
from jinja2 import Template


def db_get():
    conn =\
        psycopg2.connect("dbname=plugin_map_snow "
                         "user=plugin_map_snow "
                         "host=localhost "
                         "port=7432 "
                         "password=plugin_map_snow")

    final_list = []
    for i in range(7):
        cur = conn.cursor()
        cur.execute("SELECT name_camera, date, ST_X(location), ST_Y(location),"
                    " weather, file_path FROM image "
                    "WHERE date BETWEEN NOW() - interval '%s day 5 hour' "
                    "AND NOW() - interval '%s day'"
                    "ORDER BY date DESC;" % (str(i), str(i)))
        raw_db = cur.fetchall()
        db_list = []
        camera_name_list = []
        for i in raw_db:
            if i[0] not in camera_name_list:
                camera_name_list.append(i[0])
                db_list.append([i[0], i[1].isoformat(), [i[2], i[3]],
                                int(i[4]), i[5]])
        final_list.append(db_list)
        cur.close()
    conn.close()
    return final_list


app = Flask(__name__)
if os.environ.get('MFSERV_CURRENT_PLUGIN_DEBUG', '0') == '1':
    app.config['PROPAGATE_EXCEPTIONS'] = True


@app.route("/snow_map/")
def hello_world():
    return render_template("index.html", database=db_get())


@app.route("/snow_map/<path:path>")
def redirecting(path):
    return redirect("/snow_map/", code=302)


def page_not_found(error):
    return render_template('page_not_found.html'), 404
