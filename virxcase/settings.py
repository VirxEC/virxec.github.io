"""
Django settings for virxcase project.

Generated by 'django-admin startproject' using Django 3.0.7.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.0/ref/settings/
"""

import os
import django_heroku
import dj_database_url

DEBUG = True  # PROD: False

PWA_APP_DEBUG_MODE = False # PROD: False

ALLOWED_HOSTS = ['0.0.0.0', "www.virxcase.dev", "virxcase.herokuapp.com"]

SESSION_COOKIE_SECURE = False  # PROD: True

CSRF_COOKIE_SECURE = False  # PROD: True


# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/

SECRET_KEY = os.getenv("SECRET_KEY")

SECURE_REFERRER_POLICY = "no-referrer-when-downgrade"

# Application definition

INSTALLED_APPS = [
    'main.apps.MainConfig',
    'django.contrib.sitemaps',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'pwa'
]

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'virxcase.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'virxcase.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

DATABASES = {
    'default': {}
}

DATABASES['default'].update(dj_database_url.config(conn_max_age=600))


# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/

STATIC_ROOT = os.path.join(BASE_DIR, 'main', 'static')
STATIC_URL = '/static/'

PWA_SERVICE_WORKER_PATH = os.path.join(BASE_DIR, 'main', 'static', 'js', 'service-worker.js')
PWA_APP_NAME = 'VirxEC Showcase'
PWA_APP_THEME_COLOR = '#eee'
PWA_APP_BACKGROUND_COLOR = '#131318'
PWA_APP_DISPLAY = 'fullscreen'
PWA_APP_SCOPE = '/'
PWA_APP_ORIENTATION = 'any'
PWA_APP_START_URL = '/'
PWA_APP_STATUS_BAR_COLOR = 'dark_blue'
PWA_APP_ICONS = [
    {
        "src": "/static/icons/072.png",
        "sizes": "72x72",
        "type": "image/png"
    },
    {
        "src": "/static/icons/096.png",
        "sizes": "96x96",
        "type": "image/png"
    },
    {
        "src": "/static/icons/128.png",
        "sizes": "128x128",
        "type": "image/png"
    },
    {
        "src": "/static/icons/144.png",
        "sizes": "144x144",
        "type": "image/png"
    },
    {
        "src": "/static/icons/152.png",
        "sizes": "152x152",
        "type": "image/png"
    },
    {
        "src": "/static/icons/192.png",
        "sizes": "192x192",
        "type": "image/png"
    },
    {
        "src": "/static/icons/384.png",
        "sizes": "384x384",
        "type": "image/png"
    },
    {
        "src": "/static/icons/512.png",
        "sizes": "512x512",
        "type": "image/png"
    }
]

PWA_APP_ICONS_APPLE = [
    {
        "src": "/static/icons/072.png",
        "sizes": "72x72",
        "type": "image/png"
    },
    {
        "src": "/static/icons/096.png",
        "sizes": "96x96",
        "type": "image/png"
    },
    {
        "src": "/static/icons/128.png",
        "sizes": "128x128",
        "type": "image/png"
    },
    {
        "src": "/static/icons/144.png",
        "sizes": "144x144",
        "type": "image/png"
    },
    {
        "src": "/static/icons/152.png",
        "sizes": "152x152",
        "type": "image/png"
    },
    {
        "src": "/static/icons/192.png",
        "sizes": "192x192",
        "type": "image/png"
    },
    {
        "src": "/static/icons/384.png",
        "sizes": "384x384",
        "type": "image/png"
    },
    {
        "src": "/static/icons/512.png",
        "sizes": "512x512",
        "type": "image/png"
    }
]
PWA_APP_SPLASH_SCREEN = []
PWA_APP_DIR = 'ltr'
PWA_APP_LANG = 'en-US'

django_heroku.settings(locals())
