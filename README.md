## [dearaibby.com](https://www.dearaibby.com/)
<!-- #### Heartfelt advice from the soul of a new machine -->

[![Dear AIbby Demos](./public/dotti.gif)](https://www.askaibby.com)

The first major UX upgrade I noticed about ChatGPT was its staccato text delivery: whatever ChatGPT was spewing, it was spewing in chunks. The earliest template I saw to get this right was @nutlope’s [AI Twitter Bio demo](https://www.twitterbio.com), which more or less sold me on Next.js for LLM front-ends and Vercel Edge functions for LLM streaming (for the next few experiments at least.)


After tweeting the Vercel template, my old Web 1.0 comrade Greg Beato reached out suggesting a perfectly plausible customization. At some point he’d registered the domain name [dearaibby.com](dearaibby.com) and wondered if we could hijack the Vercel demo’s one-question interface to simulate an old-fashioned advice columnist. With ease!

[![Dear AIbby Demos](./public/demos.webp)](https://www.askaibby.com)

Greg’s prompt (see below, left) returned a convincing Dear Abby, but I couldn’t help feeling like we were ignoring an equally impersonable advisor: [Dear Dotti](https://weeklyworldnews.com/advice/179502/dear-dotti/). It occurred to me whatever editorial guidelines the Weekly World News originally devised for the column in the 1980s probably looked a lot like a GPT prompt, ie. what fits on a standard-sized post-it note.

[![Dear AIbby Demos](./public/abby-dotti.png)](https://www.askaibby.com)

**INSULTING**, **QUICK-TEMPERED**, **EASILY DISTRACTED** got us a very convincing Dotti, and the last two terms were probably overkill. (Like **SLIGHTLY MAD**, they foreshadow my plans to prompt GPT to footnote poetry in the scholarly style of Charles Kinbote. Stay tuned.) Ultimately Greg was quite taken with the Dotti simulacrum, he thinks she has a real knack for emojis.


### @nutlope's Install Notes

#### How it works

This project uses the [OpenAI GPT-3 API](https://openai.com/api/) (specifically, text-davinci-003) and [Vercel Edge functions](https://vercel.com/features/edge-functions) with streaming. It constructs a prompt based on the form and user input, sends it to the GPT-3 API via a Vercel Edge function, then streams the response back to the application.

Video and blog post coming soon on how to build apps with OpenAI and Vercel Edge functions!

#### Running Locally

After cloning the repo, go to [OpenAI](https://beta.openai.com/account/api-keys) to make an account and put your API key in a file called `.env`.

Then, run the application in the command line and it will be available at `http://localhost:3000`.

```bash
npm run dev
```

#### One-Click Deploy

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=vercel-examples):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Nutlope/twitterbio&env=OPENAI_API_KEY&project-name=twitter-bio-generator&repo-name=twitterbio)
