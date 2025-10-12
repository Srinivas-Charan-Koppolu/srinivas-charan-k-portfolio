// src/pages/Stories/story.js

// Initialize an empty stories array
const stories = [];

/**
 * Function to add a new story to the main stories array.
 *
 * @param {Object} params - Story details
 * @param {number|string} params.id - Fixed unique ID (string or number)
 * @param {string} params.title - Story title
 * @param {string} params.author - Story author
 * @param {string} [params.addedOn] - ISO timestamp (default: now)
 * @param {string} [params.visibility] - visible | hidden | unlisted | changable
 * @param {string|null} [params.makeVisibleAfter] - date/time (if changable)
 * @param {string} [params.content] - story body text
 * @param {string} [params.moral] - story moral or conclusion (optional)
 */
function addStory({
  id,
  title,
  author,
  addedOn = new Date().toISOString(),
  visibility = "visible",
  makeVisibleAfter = null,
  content = "",
  moral = "",
}) {
  if (!id) {
    throw new Error("❌ addStory() requires a fixed 'id' value.");
  }

  const newStory = {
    id, // fixed, not auto-increment
    title,
    author,
    addedOn,
    visibility,
    makeVisibleAfter,
    content,
    moral,
  };

  stories.push(newStory);
}

// ✅ You can now add stories like this:
// addStory({
//   id: "unique-id",
//   title: "Story Title",
//   author: "Author Name",
//   content: `Your story text here...`,
//   moral: `Optional moral or lesson.`,
// });





addStory({
  id: "the-dead-dream",
  title: "The Dead Dream",
  author: "Thiru",
  addedOn: "2025-10-12T10:00:00Z",
  visibility: "visible",
  content: `
Dreams—everyone has them, and so did I. It was the prime of my life, my teenage years, when the world felt like it was brimming with endless possibilities. Life was normal, predictable even, until one ordinary day changed everything.

During a regular class, a seemingly harmless chalk hit me squarely on a sensitive part of my head. At first, I dismissed it as a trivial incident, never imagining it could alter the course of my life. Days passed uneventfully, but soon, the repercussions began to surface. What seemed insignificant then started casting long shadows over my future.

My dream, once vibrant and full of hope, began to fade. Lying in bed, clutching my pillow, I endured the relentless pain brought on by medication. My mind spiraled into overthinking, consumed by the consequences of that single, careless moment. The darkness grew deeper as my brain struggled to function, leaving a blank void where my dreams once thrived.

The dream was now dead, shrouded in the metaphorical black cloth of despair. My aspirations seemed unreachable, my path blocked by the weight of that one unfortunate event. But amidst the sorrow, a flicker of defiance sparked within me. I refused to surrender.

Determined to reclaim my dream, I decided to fight back. No matter how steep the climb, I knew I would persevere. Slowly, I rebuilt myself, brick by brick, moment by moment.

And then, the day arrived. I stood tall, surrounded by people who admired me for my work and resilience. The journey from the *Dead Dream* to a *Rebirth of Enthusiasm* was complete. That moment of recognition was my triumph, a testament to the power of persistence and belief in oneself.
`,
  moral: `Life is never truly over or fully written. It’s a canvas waiting for your brushstrokes. One action can ripple through an entire lifetime, but it is you who decides when to begin, when to end, and how to shape your story.`,
});



addStory({
  id: "too-young",
  title: "Too Young",
  author: "Thiru",
  addedOn: "2025-10-12T09:30:00Z",
  visibility: "visible",
  content: `
"It’s unbearable, I can’t tolerate this pain. I wish for some relief, like anesthesia." A 14-year-old cries out in agony, enduring the pain of a diagnosis.

Using hundreds of medicines to fight the impurities, searching for hope, a cure, and a return to normal life.

No medicine is working, and confidence is fading with growing impatience.

Life feels darker, lying on the bed for months, staring only at the ceiling of a warm room.

Muscles weakened, vision worsened, strength diminished, and dreams vanished.

My mind opened its doors to depression, and it stayed there for a month.

Suddenly, I heard a voice from the unwilling corner of my mind—it was depression speaking to me.

"You're too young to welcome me in. Let me out of your mind and start thinking," said my depression in a bold, yet oddly encouraging voice.

I, a 15-year-old boy, held my breath and began searching for hope and ways to break free.

A diamond needs another diamond to be cut. Similarly, ISRO uses the slingshot technique, using gravity to overcome gravity for launching rockets.

I decided to use my own pain to solve my problems, and it started hurting more and more.

I intentionally harmed myself, increasing the pain to a level where no medicine could help.

Finally, when the day came that I stopped hurting myself, the pain inside seemed so small in comparison.

It's like how solving big problems makes the smaller ones seem easy. That’s exactly how I felt.

I trained through pain for almost 4 years, and now I stand strong, having come out of the worst, ready to face anything.
`,
  moral: `Pain and struggles, though difficult, can lead to personal growth and strength. Even in our darkest moments, we have the power to rise, think differently, and find a way out. Never let temporary pain define you; instead, let it shape you into someone stronger.`,
});



addStory({
  id: "that-moment",
  title: "That Moment",
  author: "Thiru",
  addedOn: "2025-10-12T11:00:00Z",
  visibility: "visible",
  content: `
It was a quiet night, around 8 PM, and I am home alone, walking with a shopping bag in hand with my favorite treat to enjoy during my movie night.
The day had been precious, like a fleeting moment that all women experience every month.

As I strolled down the street, my peaceful walk was interrupted by the unsettling feeling of someone’s gaze.
A man was watching me with an intense, uncomfortable stare, and I couldn’t shake the sense that something was wrong.
Fear gripped me, and my heart raced. I held my breath, summoning all the courage I could, and quickly crossed the road, heading towards the safety of home.

But the fear lingered, gnawing at the back of my mind. I tried to push it away, distracting myself by scrolling through social media, hoping to forget the unease.
Yet, the feeds only worsened it, flooding my mind with unsettling content.

Just when I thought my nerves would betray me, a message appeared on my phone: "Why are you online this late?" It was 2 AM by then.
In that moment, something shifted. As I shared my story, my breath slowed, and my heart found its rhythm again.

Those simple words acted like medicine to my troubled soul, soothing the chaos within me.
And as I sat there, reflecting on it all, I realized something profound:
`,
  moral: `Staying close doesn't mean being beside; it's about the belief and care to show at life’s struggling moments.`,
});



addStory({
  id: "living-alone",
  title: "Living Alone",
  author: "Thiru",
  addedOn: "2025-10-12T11:30:00Z",
  visibility: "visible",
  content: `
At some point in life, everyone experiences the heavy burden of loneliness. I, too, have been a victim of this profound and aching feeling.  

I was just 10 years old, nestled in my mother's warm embrace, discovering the world through innocent eyes and the joy of playing with my family.  

Life can sometimes feel like a cruel and unforgiving force. At that tender age of confusion, I couldn’t fully grasp the reality of what was happening around me.  

The words echoed in my ears, breaking my innocence: "Daughter, I am facing a serious health issue now."  

Years passed, and there she was, holding my hand with fading strength, whispering softly, "My dear daughter, stay strong. There’s so much you have to achieve. Life is unpredictable, but go chase your dreams. I will always be with you, forever."  

Months later, I found myself in a heart-wrenching moment, left with a black mark etched on my soul as she departed, leaving me alone in this vast, unfamiliar world.  

Time feels like an enemy, standing firmly against me. Life seems to have abandoned me, and everything around me feels out of place.  

Before I could recover from this tragic loss, my other pillar of hope—the very reason for my existence on this earth—also left me. My family of four had turned into just two by the time I was 13, an age when a young girl needs the most love and care.  

In that moment, I made a vow, holding my little brother's hand tightly and shouting out loud: "I will fight! I will face whatever comes my way! I am strong, I am powerful!" The words I once heard echoed in my mind, fueling my resolve.  

I began to think, to tackle each challenge, carrying the weight of life on my shoulders. And now, standing strong on my own legs, leading a successful business, I whispered to the sky, "Mom, I did it." The clouds parted as if to let her voice through, "Proud of you, my daughter," with rolling tears of pride.  
`,
  moral: `From the darkest of times, we learn to light our own way. No matter the struggle, the strength to rise is always within us.`,
});




addStory({
  id: "an-eraser",
  title: "An Eraser",
  author: "Thiru",
  addedOn: "2025-10-12T12:00:00Z",
  visibility: "visible",
  content: `
I am an artist, a passion I’ve nurtured since second grade. With over 20 years of experience, I’ve mastered every stroke, every line. My fast-hand drawings are unmatched, and I rarely rely on an eraser—my confidence in every mark is unshakable. Awards line my shelves, each a testament to my skill and the life I’ve built from my talent.  

One day, as I sat on my balcony, enjoying the serenity of nature, a scene caught my eye—a woman hanging wet clothes on her terrace. I instinctively reached for my sketchbook. My hand moved swiftly, capturing her graceful movements as she removed dried clothes and hung freshly washed ones on the line.  

But then, something unexpected happened. The thread, burdened by the weight of the wet clothes, snapped, scattering everything. For the first time, I noticed what had been hidden behind the canopy of clothes—a breathtaking hill.  

The hill seemed to speak to me: <i>"Finally, you’ve seen me."</i> The tree atop the hill whispered: <i>"True art reveals itself when you explore the unknown."</i> The river at its base paused for me, its currents murmuring: <i>"Flowing doesn’t always lead you to the right destination; the path matters just as much."</i>  

In that moment, I realized I had been so focused on the obvious that I’d missed the beauty of what lay beyond. For the first time in years, I picked up my eraser and wiped away my drawing. I started anew, incorporating the hill, the tree, and the river.  

When I finished, the joy and fulfillment I felt were unparalleled. That simple act of erasing and redrawing changed not only my perspective as an artist but also my outlook on life.  
`,
  moral: `Life is like a rope, and you are the artist. The canvas you create is yours to decide—so look beyond the obvious and embrace the unknown.`,
});






export default stories;
