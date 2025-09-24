import { getSortedPostsData } from '@/lib/posts';
import HomePageContent from '@/components/HomePageContent';

export default function Home() {
  const allPostsData = getSortedPostsData();
  return (
    <div>
      <h1>Aayush Gautam</h1>
      <section>
        <h2>About Me</h2>
        <p>
          I&apos;m a Senior Software Engineer at RockX (also known as Bedrock), where I focus on blockchain and backend development in Golang, Python, and Solidity. I&apos;m passionate about the applied research aspects of blockchain and AI, and I enjoy implementing ideas from research papers.
        </p>
        <p>
          I&apos;m actively open to new opportunities, so please visit my resume and contact pages to get in touch.
        </p>
        <p>
          Outside of work, I enjoy watching movies and anime, traveling with my fiancée, and exploring my hobby of photography, which you&apos;ll see on this website.
        </p>
      </section>
      <section>
        <h2>Latest Content</h2>
        <HomePageContent allPostsData={allPostsData} />
      </section>
    </div>
  );
}