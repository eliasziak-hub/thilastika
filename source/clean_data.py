import json,re,html,sys
SRC=sys.argv[1];DST=sys.argv[2]
t=open(SRC,encoding='utf8').read()
a=t.find('{');b=t.rstrip().rstrip(';').rfind('}')+1
j=json.loads(t[a:b])
def linklist(inner):
    if '<img' in inner or '<div' in inner: return False
    anchors=re.findall(r'<a\s[^>]*>(.*?)</a>',inner,re.S)
    if len(anchors)<2: return False
    txt=re.sub(r'<[^>]+>','',inner);txt=re.sub(r'(&nbsp;|\xa0|\s)+','',html.unescape(txt))
    at=re.sub(r'<[^>]+>','',''.join(anchors));at=re.sub(r'(&nbsp;|\xa0|\s)+','',html.unescape(at))
    # επιτρέπονται και τίτλοι ομάδας σε <b>
    bt=''.join(re.findall(r'<b[^>]*>(.*?)</b>',inner,re.S));bt=re.sub(r'<[^>]+>|(&nbsp;|\xa0|\s)+','',html.unescape(bt))
    return len(at)>=.8*max(1,len(txt))-0 or (len(at)+len(bt))>=.9*max(1,len(txt))
def clean(c):
    n0=c
    while True:
        n=re.sub(r'<div\b[^>]*float\s*:\s*right[^>]*>.*?</div>','',c,flags=re.S|re.I)
        n=re.sub(r'<div\b[^>]*>((?:(?!<div\b).)*?)</div>',lambda m:'' if linklist(m.group(1)) else m.group(0),n,flags=re.S)
        n=re.sub(r'<div\b[^>]*>\s*(?:<br\s*/?>\s*)*</div>','',n,flags=re.S)
        if n==c:break
        c=n
    return c
def plain(c):return re.sub(r'\s+',' ',html.unescape(re.sub(r'<[^>]+>',' ',c))).strip()
chg=0;removed=0
for p in j['posts']:
    c=clean(p['content'])
    if c!=p['content']:
        chg+=1;removed+=len(p['content'])-len(c);p['content']=c
        p['searchText']=(p['title']+' '+plain(c)).strip() if p['searchText'].startswith(p['title']) else plain(c)
        p['snippet']=plain(c)[:200]
print('posts changed',chg,'bytes removed',removed)
open(DST,'w',encoding='utf8').write(t[:a]+json.dumps(j,ensure_ascii=False,separators=(',',':'))+t[b:])
