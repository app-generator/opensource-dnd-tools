# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

# Flask modules

import os, random, string

from flask   import render_template, request, send_file
from jinja2  import TemplateNotFound

# App modules
from apps import app

PATH_ROOT      = os.path.abspath(os.path.dirname(__file__))
PATH_TEMPLATES = os.path.join(PATH_ROOT, 'templates')
PATH_KITS      = os.path.join(PATH_TEMPLATES, 'kits.json')

# App main route + generic routing
@app.route('/')
def index():
    return 'Hello'

# KITS
@app.route('/kits/')
def kits():
    return send_file(PATH_KITS)

# Per KIT Info
@app.route('/kits/<template>/')
def template(template):
    INFO_JSON = os.path.join(PATH_ROOT, 'templates', template, 'info.json')
    return send_file(INFO_JSON)
