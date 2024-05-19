from clovax import ClovaX

c = ClovaX()
c.get_cookie("clova-x.naver.com_cookies.txt")
log = c.start("1+ 1은 뭐야")
log = c.regenerate()

print(log["text"])