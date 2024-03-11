from app import create_app


if __name__ == '__main__':
    import gunicorn
    app = create_app()

    gunicorn.gunicorn.serve(
        'wsgi:app',
        workers=4,
        bind='0.0.0.0:5000'
    )