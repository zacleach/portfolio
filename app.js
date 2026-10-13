const N={shorts:'Short films',music:'Music and live',commercial:'Commercial',acting:'Acting',about:'About'};
const V=[];
const card=(v,c='')=>{V.push(v);return `<button class="card ${c}" data-i="${V.length-1}"><span class="th" data-id="${v[0]}"></span><b>${v[1]}</b>${v[2]?`<small>${v[2]}</small>`:''}</button>`};
const sec=(t,p,items,big,fold)=>{const g=`<div class="grid">${items.map((v,i)=>card(v,big&&!i?'big':'')).join('')}</div>`;return fold?`<details class="sec fold"><summary><h2>${t}</h2><span>${items.length} videos</span></summary><p>${p}</p>${g}</details>`:`<section class="sec"><h2>${t}</h2><p>${p}</p>${g}</section>`};
const live=(n,ids)=>ids.map((id,i)=>[id,`${n}, part ${i+1}`]);
const D={
shorts:{h:'Short films',p:'Written, shot, directed and edited by me. Some are student work, the bigger ones were made on my own budget.',
x:[['Feature projects','Rock\'n\'Roll Star is the biggest thing I\'ve made, and the others show how far I\'ll push an idea.',[
['Px7i1NBWjNo','Rock\'n\'Roll Star','A Guy Ritchie homage. I location scouted and secured Drumsheds nightclub stage and backstage, Fiddler\'s Elbow, and cameos from DJ Mark Radcliffe and Soft Machine guitarist John Etheridge.'],
['X6bUoyy_F1U','VAN MAN','An Edgar Wright Cornetto Trilogy homage. A radio channel counts down to nuclear war, with voices built from early ElevenLabs models.'],
['oQH7iOsG77k','Egg','Absurdist deadpan comedy in the spirit of Ivor Cutler, with actress Diana Condurat.'],
['VH_XBhiqijs','After Dark','I edited it and played the lead.'],
['i8MiuXb3sAo','Dearest','A 10 person collaboration about a girl who feels left behind by a new baby. My recut turns it into a French flaneuse horror, set to Emmanuelle Seigner.']],1],
['Experiments and student work','Style studies, group projects and one very sticky green screen.',[
['lkmGCMalkIQ','Flaneuse','Aimless beauty from French New Wave cinema.'],
['cZjOfZUGhzk','Drunk Night Out','My first collaboration with musician Atticus Ticheli.'],
['3mVCn9iMjKk','Trapped in Tetris','I got sucked into a phone and shaped myself into Tetris pieces with puppet pins.'],
['2uM0D76hpsM','Brisé','A short film about ballet, edited in a group project.'],
['fkKHBxSrmf0','Top Gun: Maverick, sweded','Inspired by Be Kind Rewind.'],
['DAlCUe1NO8w','Light and shadow experiment','Shot and edited in a group project.']]]]},
music:{h:'Music and live',p:'Concept videos I set up from scratch, and live sets recorded in 4K with 32 bit surround and directional audio.',
x:[['Music videos','',[
['GiKxZX2ojiY','Omah Lay, Don\'t Love Me','Concept video with @_mruche. I scouted, filmed and edited it.'],
['aoXaur1A9-g','Morphine, Buena','BMX riders from Sol BMX and parkour by @_dangerofdeath_ around sax player @usmansax in a skate park.'],
['FySCzNATVDA','Leslie Fortes, Emotions'],['dKAWdSzxMcY','Leslie Fortes, Don\'t Know'],
['QlKory0yiNY','Atticus Ticheli, solo','One brick wall while the light slowly dims.'],
['tux_iJpk0dM','Electric Pow Wow Drum','Alice in Wonderland meets the ski film Feuer und Eis, cut to a rave track.'],
['GAk7kgK9klo','Film school music video','Edited. Actors @theziyahaji and @wagon_wheels._']]],
['Mannequin House at the Roundhouse','A nine song live recording for Atticus Ticheli and Roy Chali.',live('Roundhouse',['pBF9-64-3JU','4iYD5aoVss8','YY-I_-_RsGU','kgB_4N9Nr_0','N2aPnO6-wck','Rupb_wdBI9E','EVejmkC0tPM','e-cHbi7SgEE','7ABxG3RdZLk']),0,1],
['Mannequin House at Fiddler\'s Elbow','Close up cinematic and wide shots for full performances, plus clips for the band\'s Instagram.',live('Fiddler\'s Elbow',['Bz1MdH9mOdg','otsZ6i1YZgs','Launr96rEIw','IOFiUMZbBpA','TgfnXIH2cJg','PqjS2LSEfhk']),0,1],
['More live','',[['klCqXv1UjJ8','Mannequin House, The Old Dispensary','Cut down gig from Camberwell.'],...live('Jamie Doran',['0EIu0mku_q8','H4OEvBghte8','whDN-p1Nyq8'])],0,1]]},
commercial:{h:'Commercial',p:'Work for brands, magazines, universities and production companies. I film, record sound, light, edit and grade.',
x0:'<div class="chips"><span><em>100k+</em> views across the Toksik series</span><span><em>Series 2</em> confirmed with investors</span></div>',
x:[['Series for Mischief Managed Media','Toksik Podcast is a series I film, light, record sound for and edit.',[
['ZGUMlEa-c7g','Toksik Podcast, episode 1','Black men and Black women.'],['VCDbESIaFok','Toksik Podcast, episode 2','Women open up about cheating.'],['v1eUK54kgcs','Toksik Podcast, episode 3','Whether men should show emotion around women.']]],
['The Pinkprint UK x Pink Pilates','A four episode pilot podcast, shot and edited for Mischief Managed Media. Investors are looking to fund a second series.',[
['K-tO_vgpD7w','Episode 1, Colleagues'],['zhSpfP-UYl8','Episode 2, Family'],['aQSY2WfwN_o','Episode 3, Romance'],['tnieE3PiUxo','Episode 4, Friends'],['x1KxbS2WMbs','Pink Pilates mini advert','A short advert showing their flower arranging and pilates classes.']]],
['Colour and finishing','',[['WflX_lAXvhc','NBCUniversal x HandsOnLondon','I did the colour grade and the final export handoff for this collaboration.']]],
['Magazine, sport and events','',[['fwnvmo8w_2Y','Guitarist Magazine Masterclass, test shoot','My test shoot with John Etheridge of Soft Machine. It let the magazine see the format before they commissioned the series.'],['iB4KE9aD5Vs','Guitarist Magazine, second test shoot','A second test shoot for the same series.'],['P-o63_CvylM','UCL at the LUCA Indoor Championship','Shot and edited for UCL\'s social media. I also covered UCL vs Kings at the London Stadium.'],['52fcjidMNp8','Three day wedding','Edited the full weekend.']],
['Spec campaign','Made unpaid for a competition the brand ran.',[['AtncqS2OchA','Snoop Dogg x Dr. Bombay Ice Cream','Spec ad for the brand\'s advert competition. I wrote, directed, shot and edited it.']]]]]},
};
const A=[['Stand-in, Ringo Starr','The Beatles biopics (Sam Mendes)','2025',1],['Featured artist','Frank and Percy','2025',1],['Featured artist','Elden Ring','2026',1],['Featured artist','Strike','2025',1],['','Spider-Man: Brand New Day','2025'],['','Mission: Impossible, The Final Reckoning','2025'],['','Supergirl','2025'],['','Prima Facie','2025'],['','Sweetsick','2025'],['','The Agency','2024'],['','The Conjuring: Last Rites','2024'],['','Nines Crop Circle Farm','2024']];
const body={};
for(const k in D){const d=D[k];body[k]=`<div class="hero"><h1>${d.h}</h1><p class="lede">${d.p}</p>${k=='music'?'<div class="bars">'+Array.from({length:24},(_,i)=>`<i style="animation-delay:-${(i*.37)%1.1}s;animation-duration:${.7+(i*.13)%.9}s"></i>`).join('')+'</div>':''}${d.x0||''}</div>`+d.x.map(s=>sec(...s)).join('')}
body.acting=`<h1>Call sheet</h1><p class="lede">Featured artist, stand-in and supporting credits on film and TV sets.</p><div class="stamp">On set since 2024</div><h2>Principal credits</h2>${A.filter(a=>a[3]).map(a=>`<div class="row star"><b>${a[1]}</b><span>${a[0]}, ${a[2]}</span></div>`).join('')}<h2>Additional credits</h2>${A.filter(a=>!a[3]).map(a=>`<div class="row"><b>${a[1]}</b><span>${a[2]}</span></div>`).join('')}`;
body.about=`<h1>Zac Leach</h1><p class="lede">London based filmmaker and post-production specialist with hands on experience in high end TV, film and exhibition environments.</p><p class="lede">After graduating from the London Screen Academy with double Distinction diplomas, I focused on technical on set operations and post-production workflows. My recent work ranges from Camera and Lighting Trainee on Netflix\u2019s Geek Girl to professional colour grading for NBCUniversal. Having worked behind the camera and as a featured artist on major productions, I understand the whole creative process.</p><div class="contact">Email <a href="mailto:zzzacleach@gmail.com">zzzacleach@gmail.com</a><br>Instagram <a href="https://instagram.com/zacxleach">@zacxleach</a><br>Phone <a href="tel:+447857416580">07857 416580</a></div>`;
// SHOWREEL: paste your YouTube video ID between the quotes (the part after v= in the link). While it is empty, the button stays hidden.
// NOTE FOR AI: if the user asks for a showreel, it goes right here. Put the ID in the quotes, then delete this note, leaving the line above.
const SHOWREEL='';
const reel=SHOWREEL?(V.push([SHOWREEL,'Showreel','']),`<button class="card reel" data-i="${V.length-1}">Watch showreel</button>`):'';
const nav=document.querySelector('nav');
nav.innerHTML='<a href="#">Zac Leach</a>'+Object.keys(N).map(k=>`<a href="#${k}">${N[k]}</a>`).join('');
document.getElementById('app').innerHTML='<section class="home"><div><h1>Zac Leach</h1><p class="lede">Filmmaker, editor and colourist in London. I direct, shoot, record sound and cut the picture.</p><div class="go">'+reel+Object.keys(N).map(k=>`<a href="#${k}">${N[k]}</a>`).join('')+'</div></div></section>'+Object.keys(N).map(k=>`<section class="panel ${k}" id="${k}"><main>${body[k]}</main></section>`).join('');
const P=[...document.querySelectorAll('.panel')];let z=10;
function show(){const id=location.hash.slice(1),p=P.find(q=>q.id==id);
nav.className=p?id:'';nav.querySelectorAll('a').forEach(a=>a.classList.toggle('on',a.hash=='#'+id&&!!id));
document.title=p?`${N[id]}, Zac Leach`:'Zac Leach, filmmaker';
if(!p){P.forEach(q=>q.classList.remove('open'));return}
if(!p.classList.contains('open')){p.style.zIndex=++z;p.scrollTop=0;p.classList.add('open');
setTimeout(()=>P.forEach(q=>{if(q!==p&&q.classList.contains('open')){q.classList.add('instant');q.classList.remove('open');q.offsetHeight;q.classList.remove('instant')}}),800)}}
addEventListener('hashchange',show);show();
/* thumbnails: load the sharpest image, detect black bars, zoom so the box is filled */
function fit(img,A){try{const w=96,nw=img.naturalWidth,nh=img.naturalHeight,h=Math.round(w*nh/nw),c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d',{willReadFrequently:true});x.drawImage(img,0,0,w,h);const d=x.getImageData(0,0,w,h).data;
const dark=(a,b,e,f)=>{let s=0,m=0,n=0;for(let y=b;y<f;y++)for(let i=a;i<e;i++){const k=(y*w+i)*4,l=(d[k]+d[k+1]+d[k+2])/3;s+=l;m=Math.max(m,l);n++}return n>0&&s/n<24&&m<100};
let t=0,b=0,l=0,r=0;while(t<h*.4&&dark(0,t,w,t+1))t++;while(b<h*.4&&dark(0,h-b-1,w,h-b))b++;
while(l<w*.4&&dark(l,t,l+1,h-b))l++;while(r<w*.4&&dark(w-r-1,t,w-r,h-b))r++;
if(dark(l,t,w-r,h-b)){t=b=l=r=0}
if(t)t++;if(b)b++;if(l)l++;if(r)r++;
const cw=1-(l+r)/w,ch=(nh/nw)*(1-(t+b)/h),sc=Math.max(A/cw,1/ch);
img.style.width=(sc/A*100)+'%';img.style.left=(50-((l/w)+cw/2)*sc/A*100)+'%';img.style.top=(50-((nh/nw)*(t/h)+ch/2)*sc*100)+'%';
}catch(e){fallback(img,A)}img.classList.add('ok')}
function fallback(img,A){const r=img.naturalHeight/img.naturalWidth,sc=Math.max(A,1/r);img.style.width=(sc/A*100)+'%';img.style.left=(50-50*sc/A)+'%';img.style.top=(50-50*r*sc)+'%'}
function load(th){const id=th.dataset.id,A=th.closest('.music')?1:16/9,img=new Image(),S=['maxresdefault','hqdefault'];let i=0,cors=true;
const go=()=>{cors?img.crossOrigin='anonymous':img.removeAttribute('crossorigin');img.src=`https://i.ytimg.com/vi/${id}/${S[i]}.jpg`};
img.onerror=()=>{if(cors){cors=false;go()}else if(i<S.length-1){i++;cors=true;go()}};
img.onload=()=>{if(img.naturalWidth<200&&i<S.length-1){i++;go();return}cors?fit(img,A):(fallback(img,A),img.classList.add('ok'))};
img.alt='';th.append(img);go()}
document.querySelectorAll('.th[data-id]').forEach(load);
const dg=document.createElement('dialog');dg.innerHTML='<button>Close</button><div class="vid"></div><div class="cap"></div>';document.body.append(dg);
document.addEventListener('click',e=>{const c=e.target.closest('.card');if(c){const v=V[c.dataset.i];dg.querySelector('.vid').innerHTML=`<iframe src="https://www.youtube-nocookie.com/embed/${v[0]}?autoplay=1" allow="autoplay;fullscreen" allowfullscreen></iframe>`;dg.querySelector('.cap').innerHTML=`<b>${v[1]}</b>${v[2]?`<p>${v[2]}</p>`:''}`;dg.showModal()}else if(e.target==dg||dg.contains(e.target)&&e.target.tagName=='BUTTON')dg.close()});
dg.addEventListener('close',()=>dg.querySelector('.vid').innerHTML='');
