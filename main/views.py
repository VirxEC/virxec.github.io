from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.views.decorators.http import require_GET

from main.models import Cache


def handler404(request, exception):
    return render(request, '404.html', status=404, context={
        "exception": exception,
        "title": "Whoops!"
    })


@require_GET
def robots_txt(request):
    lines = [
        "User-Agent: *",
        "Allow: /",
        "Sitemap: https://www.virxcase.dev/sitemap.xml"
    ]
    return HttpResponse("\n".join(lines), content_type="text/plain")


@require_GET
def ads_txt(request):
    content = "google.com, pub-9063288785609075, DIRECT, f08c47fec0942fa0"
    return HttpResponse(content, content_type="text/plain")


def handle_session(request):
    if request.session.get('discord') is None:
        request.session['discord'] = True

    if request.session.get('channel') is None:
        request.session['channel'] = "713127297833500712"

    if request.session.get('gamer') is None:
        request.session['gamer'] = False

    if request.session.get('interval') is None:
        request.session['interval'] = "400"


def get_session(request, title, page_css=None, curseforge_downloads=False):
    return {
        "discord": request.session['discord'],
        "channel": request.session['channel'],
        "gamer": request.session['gamer'],
        "interval": request.session['interval'],
        "title": title,
        "page_css": page_css,
        "tgui_downloads": None if not curseforge_downloads else repr(Cache.objects.get(name="TransparentGUI_downloads")),
        "vs_downloads": None if not curseforge_downloads else repr(Cache.objects.get(name="VanillaSkyBlock_downloads"))
    }


@require_GET
def home(request):
    handle_session(request)
    return render(request, "index.html", get_session(request, "VirxEC's Showcase Website", "css/index.css", True))


@require_GET
def virxeb(request):
    handle_session(request)
    virxeb_version = repr(Cache.objects.get(name="VirxEB_COMM"))
    return render(request, "VEB.html", get_session(request, f"VirxEB (COMM-{virxeb_version}) Source Code - Built on the RLBot Framework", "css/CP-S.css"))


@require_GET
def virxerlu(request):
    handle_session(request)
    return render(request, "ERLU.html", get_session(request, "VirxERLU Source Code - Built on the RLBot Framework", "css/CP-S.css"))


@require_GET
def options(request):
    if request.GET.get("discord") is not None:
        try:
            discord = request.GET['discord'] == 'True'
        except Exception:
            return redirect('options')

        request.session['discord'] = discord
        return redirect("options")
    elif request.GET.get("channel") is not None:
        try:
            channel = str(request.GET['channel'])
        except Exception:
            return redirect('options')

        if channel in {"629774177733181440", "507717342680186891", "583376212114669578", "713127297833500712", "733705579171676280", "606543169680703497", "606543227654373380"}:
            request.session['channel'] = channel

        return redirect('options')
    elif request.GET.get("gamer") is not None:
        try:
            gamer = request.GET['gamer'] == 'True'
        except Exception:
            return redirect('options')

        request.session['gamer'] = gamer
        return redirect("options")
    elif request.GET.get('interval') is not None:
        try:
            interval = int(request.GET['interval'])
        except Exception:
            return redirect("options")

        if interval % 50 != 0:
            return redirect("options")

        request.session['interval'] = interval
        return redirect("options")
    elif request.GET.get("reset") is not None:
        if request.GET['reset'] == "yes":
            request.session['discord'] = None
            request.session['channel'] = None
            request.session['gamer'] = None
            request.session['interval'] = None
        return redirect("options")

    handle_session(request)
    return render(request, "Options.html", get_session(request, "Site Options", "css/Options.css"))


@require_GET
def minecraft_curseforge(request):
    handle_session(request)
    return render(request, "curseforge.html", get_session(request, "Minecraft CurseForge Projects Vanilla SkyBlock and Transparent GUI", "css/MC-CF.css", curseforge_downloads=True))
