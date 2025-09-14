import Image from 'next/image';
import styles from './resume.module.css';
import { getResumeData } from '@/lib/resume-data';

export default async function Resume() {
  const data = getResumeData();

  if (!data) {
    return <div>No resume found.</div>;
  }

  const renderSkills = () => {
    if (Array.isArray(data.skills)) {
      return data.skills.map((skill, index) => (
        <div key={index}>
          <h3>{skill.name}</h3>
          <p>{skill.items.join(', ')}</p>
        </div>
      ));
    } else {
      return Object.entries(data.skills).map(([category, skills]) => (
        <div key={category}>
          <h3>{category.replace(/_/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</h3>
          <p>{skills.join(', ')}</p>
        </div>
      ));
    }
  };

  return (
    <div>
      <h1>{data.name}</h1>
      {data.tagline && <p>{data.tagline}</p>}

      <section>
        <h2>Contact</h2>
        <div className={styles.contactSection}>
          <div className={styles.contactItem}>
            <Image src="/icons/email.svg" alt="Email" width={24} height={24} className={styles.icon} />
            <a href={`mailto:${data.contact.email}`}>{data.contact.email}</a>
          </div>
          {data.contact.linkedin && (
            <div className={styles.contactItem}>
              <Image src="/icons/linkedin.svg" alt="LinkedIn" width={24} height={24} className={styles.icon} />
              <a href={data.contact.linkedin}>{data.contact.linkedin}</a>
            </div>
          )}
          {data.contact.telegram && (
            <div className={styles.contactItem}>
              <Image src="/icons/telegram.svg" alt="Telegram" width={24} height={24} className={styles.icon} />
              <a href={`https://t.me/${data.contact.telegram}`}>{data.contact.telegram}</a>
            </div>
          )}
          {data.contact.github && (
            <>
              <div className={styles.contactItem}>
                <Image src="/icons/github.svg" alt="GitHub Personal" width={24} height={24} className={styles.icon} />
                <a href={data.contact.github.personal}>GitHub (Personal)</a>
              </div>
              {data.contact.github.rockx && (
                <div className={styles.contactItem}>
                  <Image src="/icons/github.svg" alt="GitHub RockX" width={24} height={24} className={styles.icon} />
                  <a href={data.contact.github.rockx}>GitHub (RockX)</a>
                </div>
              )}
              {data.contact.github.bedrock && (
                <div className={styles.contactItem}>
                  <Image src="/icons/github.svg" alt="GitHub Bedrock" width={24} height={24} className={styles.icon} />
                  <a href={data.contact.github.bedrock}>GitHub (Bedrock)</a>
                </div>
              )}
            </>
          )}
          {data.contact.website && <p>Website: <a href={`http://${data.contact.website}`}>{data.contact.website}</a></p>}
        </div>
      </section>

      <section>
        <h2>Summary</h2>
        <p>{data.summary}</p>
      </section>

      <section>
        <h2>Skills</h2>
        {renderSkills()}
      </section>

      <section>
        <h2>Experience</h2>
        {data.experience.map((exp, index) => (
          <div key={index}>
            <h3>{exp.role} - {exp.display_name || exp.company}</h3>
            <p><em>{exp.start_date} - {exp.end_date} {exp.location && `| ${exp.location}`}</em></p>
            <ul>
              {exp.bullets.map((bullet, i) => <li key={i}>{bullet}</li>)}
            </ul>
          </div>
        ))}
      </section>

      <section>
        <h2>Education</h2>
        {data.education.map((edu, index) => (
          <div key={index}>
            <h3>{edu.degree} - {edu.university || edu.institution}</h3>
            <p><em>{edu.period} {edu.location && `| ${edu.location}`}</em></p>
          </div>
        ))}
      </section>

      {data.projects && (
        <section>
          <h2>Projects</h2>
          {data.projects.map((project, index) => (
            <div key={index}>
              <h3>{project.name}</h3>
              <p><em>{project.timeline} {project.guide && `| Guide: ${project.guide}`}</em></p>
              <p>{project.description}</p>
              {project.bullets && (
                <ul>
                  {project.bullets.map((bullet, i) => <li key={i}>{bullet}</li>)}
                </ul>
              )}
              {project.keywords && <p><strong>Keywords:</strong> {project.keywords.join(', ')}</p>}
            </div>
          ))}
        </section>
      )}

      {data.open_source && (
        <section>
          <h2>Open Source</h2>
          {data.open_source.map((os, index) => (
            <div key={index}>
              <h3><a href={os.url}>{os.name}</a></h3>
              <p>{os.description}</p>
            </div>
          ))}
        </section>
      )}

      {data.interests && (
        <section>
          <h2>Interests</h2>
          <p>{data.interests.join(', ')}</p>
        </section>
      )}

      {data.achievements && (
        <section>
          <h2>Achievements</h2>
          <ul>
            {data.achievements.map((achievement, i) => <li key={i}>{achievement}</li>)}
          </ul>
        </section>
      )}

    </div>
  );
}