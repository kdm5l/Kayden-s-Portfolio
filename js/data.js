
/* ============ SETTINGS ============ */
const CONFIG={slideSeconds:13, /* seconds each group of three is shown */ idleSeconds:30,contactForm:false}; // contactForm:true needs the PHP server (see README)
/* ============ IMAGES: id -> file in /images ============ */
const IMG={ao1:'images/ao1.jpg',ao2:'images/ao2.jpg',ao3:'images/ao3.jpg',ao4:'images/ao4.jpg',ao5:'images/ao5.jpg',bf1:'images/bf1.jpg',bf2:'images/bf2.jpg',bf3:'images/bf3.jpg',bf4:'images/bf4.jpg',bl1:'images/bl1.jpg',co1:'images/co1.jpg',ff1:'images/ff1.jpg',ff2:'images/ff2.jpg',ff3:'images/ff3.jpg',ff4:'images/ff4.jpg',fg1:'images/fg1.jpg',lo1:'images/lo1.jpg',mp1:'images/mp1.jpg',portrait:'images/portrait.jpg',pp1:'images/pp1.jpg',pp2:'images/pp2.jpg',pp3:'images/pp3.jpg',qg1:'images/qg1.jpg',sl1:'images/sl1.jpg',sl2:'images/sl2.jpg',sl3:'images/sl3.jpg',za1:'images/za1.jpg',za2:'images/za2.jpg',za3:'images/za3.jpg',za4:'images/za4.jpg',zl:'images/zl.jpg',zm1:'images/zm1.jpg',zm2:'images/zm2.jpg',zm3:'images/zm3.jpg',zm4:'images/zm4.jpg',zm5:'images/zm5.jpg',zp:'images/zp.jpg',zs1:'images/zs1.jpg',zs2:'images/zs2.jpg',zs3:'images/zs3.jpg',zs4:'images/zs4.jpg'};
/* ============ VIDEOS: image id -> video file in /videos ============
   Uncomment a line after putting the .mp4 in the videos folder. The image with the same id is used as the poster. */
const VIDEOS={
 bl1:'videos/brand-launch.mp4',        // Brand Launch
 co1:'videos/commercial.mp4',          // Commercial
 lo1:'videos/lodge-advert.mp4',        // Lodge Advert
 ba1:'videos/brand-advertorial.mp4',   // Brand Advertorial (hidden automatically until this file exists)
};
/* Project entries look like: [imageId, 'Heading shown above the image', 'Optional text under the heading'] */
/* ============ CATEGORIES ============ */
const C=['Illustration & Drawing','Photography','Branding & Graphic Design','Animation & Motion Design','Web & Interaction'];
const P=[];const p=(t,c,h,d,m,im)=>P.push({t,c,h,d,m,im});
p('Samsung Zenith',[2],'zs1','Samsung Zenith is a luxury sub-brand concept for Samsung, designed around precision, performance and modern technology. The brand identity combines sleek curves and smooth forms while still being sharp. The project covers the logo, pattern, packaging, brand imagery, applications and social content for its flagship product, the Zenith Prime laptop.',[['Role','Brand identity / direction'],['Focus','Luxury, technology'],['Outputs','Logo, pattern, packaging, social'],['Parent brand','Samsung'],['Tagline','Above the rest'],['Product','Zenith Prime laptop']],[
 ['zl','Logo','The Samsung Zenith logo, with the tagline “Above the rest”.'],
 ['zp','Packaging Design','Packaging for the Zenith Prime laptop: rigid paperboard with an EVA foam insert in a matte black finish, with a laptop tray and a separate accessory tray. Key features: premium unboxing experience, multi-layer protection, dedicated accessory compartments, easy-lift pull tabs and sustainable packaging.'],
 ['zs1','Brand Imagery','Brand imagery for the Zenith Prime laptop: “Ultra slim. Ultra powerful.”'],
 ['zs2','Brand Imagery','Brand imagery: “Sleek outside. Powerful inside.”'],
 ['zs3','Brand Imagery','Brand imagery: “Reach your Zenith.”'],
 ['zs4','Brand Imagery','Brand imagery: “Built to elevate.”'],
 ['za1','Applications — Apparel','The Zenith mark applied to apparel: a black tee.'],
 ['za2','Applications — Exhibition Stand','The brand applied to an exhibition stand environment.'],
 ['za3','Applications — Apparel','The Zenith mark applied to apparel: a white tee.'],
 ['za4','Applications — Outdoor Advertising','The brand applied to an outdoor wall display: “Built to elevate.”'],
 ['zm1','Social Media','Social post for Zenith Prime: “Precision in every detail.”'],
 ['zm2','Social Media','Social post: “Designed to perform. Built to last.”'],
 ['zm3','Social Media','Social post: “The new standard of power.”'],
 ['zm4','Social Media','Social post: “Reach your Zenith.”'],
 ['zm5','Social Media','Social post: “Ultra slim. Ultra powerful.”']]);
p('Atlanta Ogres',[0,2],'ao2','The Atlanta Ogres sports brand is a brand identity concept for a fictional hockey team. It centres on a logo depicting a green ogre warrior — a good fit for an aggressive, physical sport — alongside a mascot character called Titus, a hockey jersey design and a Match Day poster.',[['Role','Brand identity, apparel'],['Focus','Sport'],['Outputs','Logo, apparel, social media']],[
 ['ao1','Logo','A green ogre warrior, chosen because hockey is an aggressive, physical sport.'],
 ['ao3','Mascot — Titus','Titus, the team’s mascot character.'],
 ['ao2','Brand Identity','The identity set: the mascot, the full-colour logo and a black-and-white version.'],
 ['ao4','Hockey Jersey','The logo applied to the team’s hockey jersey design.'],
 ['ao5','Match Day Poster','Match Day poster: Atlanta Ogres vs New Jersey Devils — “We are hungry for victory.”']]);
p('Firefly Studios',[2],'ff4','Firefly Studios is a creative production house focused on visual storytelling, specialising in 2D and 3D animation and character design. The identity is built around a firefly in an inviting way that makes the brand instantly recognisable, using a warm colour palette and clean typography.',[['Role','Brand identity / direction']],[['ff1','Logo'],['ff4','Business card'],['ff2','Letterhead'],['ff3','Invoice']]);
p('Brand Flip',[2],'bf2','A rebrand concept for LinkedIn, combining LinkedIn’s colour palette with the logo and font style of American fast-food establishment In-N-Out Burger. Together they form a rebrand that brings what LinkedIn offers, but faster and better.',[['Role','Brand identity / art direction'],['Focus','Fast connections'],['Outputs','Logo, packaging and apparel']],[['bf1','Logo','Tagline: “Fast connections served fresh.”'],['bf2','Apparel — Front'],['bf3','Apparel — Back'],['bf4','Packaging — Coffee Cup']]);
p('Movie Poster',[2],'mp1','A single-page visual communication piece designed to work as a high-impact promotional graphic.',[['Category','Graphic communication'],['Format','Poster design']],[['mp1','Movie poster']]);
p('Still Life Photography',[1],'sl1','A still life photography project experimenting with different apertures, shutter speeds and ISO. The pictures were taken at the botanical gardens.',[['Category','Graphic communication'],['Focus','Aperture, shutter speed, ISO']],[['sl1','Still life'],['sl2','Still life'],['sl3','Botanical gardens']]);
p('Product Photography',[1,0],'pp1','A product photography project: taking pictures of a product in use that could potentially be used to advertise it. The product is charcoal pencils, used to illustrate the image — which Kayden had illustrated.',[['Category','Graphic communication'],['Product','Charcoal pencils']],[['pp1','Product in use'],['pp2','Product in use'],['pp3','Detail']]);
p('Brand Launch',[3],'bl1','This brand launch video project was created to introduce the sub-brand Samsung Zenith.',[['Format','Video — still frame shown'],['Brand','Samsung Zenith']],[['bl1','Video still']]);
p('Commercial',[3],'co1','This video project is a product commercial. The product chosen is the Ford Mustang 1969 Boss.',[['Format','Video — still frame shown'],['Product','Ford Mustang 1969 Boss']],[['co1','Video still']]);
p('Lodge Advert',[3],'lo1','A lodge advert video project, shown here as a still frame.',[['Format','Video — still frame shown']],[['lo1','Video still']]);
p('Brand Advertorial',[3],'ba1','Brand advertorial video project.',[['Format','Video']],[['ba1','Brand Advertorial']]);
p('Character Portrait',[0],'portrait','An illustrated character portrait of Kayden, featured in the About Me section of the portfolio.',[['Category','Illustration']],[['portrait','Illustrated portrait']]);
p('Figma Prototype',[4],'fg1','Interface design prototype for the Samsung Zenith brand, built in Figma.',[['Category','Web development'],['Tool','Figma'],['Brand','Samsung Zenith']],[['fg1','Prototype screens']]);
p('Wisecrack Quiz',[4],'qg1','Wisecrack Quiz is a questionnaire game. The aim of the project was to code the game.',[['Category','Web development'],['Type','Coded game']]);
P[P.length-1].im=[['qg1','Quiz game','Click “Play the game” to try it live, right here.']];
P[P.length-1].play='games/wisecrack-quiz/index.html'; // live demo (folder: games/wisecrack-quiz)
