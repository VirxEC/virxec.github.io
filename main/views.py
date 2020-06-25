from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.views.decorators.http import require_GET

from main.models import Version

def handler404(request, exception):
    return render(request, '404.html', status=404, context={
        "exception": exception
    })

@require_GET
def robots_txt(request):
    lines = [
        "User-Agent: *",
        "Allow: /",
        "Sitemap: /sitemap.xml"
    ]
    return HttpResponse("\n".join(lines), content_type="text/plain")

def handle_session(request):
    if request.session.get('discord') == None:
        request.session['discord'] = True

    if request.session.get('channel') == None:
        request.session['channel'] = "629774177733181440"
    
    if request.session.get('gamer') == None:
        request.session['gamer'] = False

    if request.session.get('interval') == None:
        request.session['interval'] = "400"

def get_session(request):
    return {
        "discord": request.session['discord'],
        "channel": request.session['channel'],
        "gamer": request.session['gamer'],
        "interval": request.session['interval'],
        "calcplus_ts": str(Version.objects.get(name="CalcPlus_TS")),
        "calcplus_js": str(Version.objects.get(name="CalcPlus_JS"))
    }

@require_GET
def home(request):
    handle_session(request)
    return render(request, "index.html", get_session(request))

@require_GET
def calcplus_preview(request):
    handle_session(request)
    return render(request, "CP-P.html", get_session(request))

@require_GET
def calcplus_source(request):
    handle_session(request)
    return render(request, "CP-S.html", get_session(request))

@require_GET
def virxeb(request):
    handle_session(request)
    return render(request, "VEB.html", get_session(request))

@require_GET
def options(request):
    if request.GET.get("discord") != None:
        try:
            discord = bool(request.GET['discord'])
        except Exception:
            return redirect('options')
        
        request.session['discord'] = discord
        return redirect("options")
    elif request.GET.get("channel") != None:
        try:
            channel = str(request.GET['channel'])
        except Exception:
            return redirect('options')
        
        if ["629774177733181440", "507717342680186891", "583376212114669578", "713127297833500712"].count(channel) == 1:
            request.session['channel'] = channel

        return redirect('options')
    elif request.GET.get("gamer") != None:
        try:
            gamer = bool(request.GET['gamer'])
        except Exception:
            return redirect('options')
        
        request.session['gamer'] = gamer
        return redirect("options")
    elif request.GET.get('interval') != None:
        try:
            interval = int(request.GET['interval'])
        except Exception:
            return redirect("options")
        
        if interval % 50 != 0:
            return redirect("options")

        request.session['interval'] = interval
        return redirect("options")
    elif request.GET.get("reset") != None:
        if request.GET['reset'] == "yes":
            request.session['discord'] = None
            request.session['channel'] = None
            request.session['gamer'] = None
            request.session['interval'] = None
    
    return render(request, "Options.html", get_session(request))