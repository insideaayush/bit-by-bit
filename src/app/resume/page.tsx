import Image from 'next/image';
import styles from './resume.module.css';
import { getResumeData } from '@/lib/resume-data';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume - Aayush Gautam',
  description: 'The resume of Aayush Gautam.',
};

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
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className={`${styles.icon} bi bi-envelope`} viewBox="0 0 16 16">
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
            </svg>
            <a href={`mailto:${data.contact.email}`}>{data.contact.email}</a>
          </div>
          {data.contact.linkedin && (
            <div className={styles.contactItem}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className={`${styles.icon} bi bi-linkedin`} viewBox="0 0 16 16">
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
              </svg>
              <a href={data.contact.linkedin}>{data.contact.linkedin}</a>
            </div>
          )}
          {data.contact.telegram && (
            <div className={styles.contactItem}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className={`${styles.icon} bi bi-telegram`} viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09"/>
              </svg>
              <a href={`https://t.me/${data.contact.telegram}`}>{data.contact.telegram}</a>
            </div>
          )}
          {data.contact.github && (
            <>
              <div className={styles.contactItem}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className={`${styles.icon} bi bi-github`} viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
                </svg>
                <a href={data.contact.github.personal}>GitHub (Personal)</a>
              </div>
              {data.contact.github.rockx && (
                <div className={styles.contactItem}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className={`${styles.icon} bi bi-github`} viewBox="0 0 16 16">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
                  </svg>
                  <a href={data.contact.github.rockx}>GitHub (RockX)</a>
                </div>
              )}
              {data.contact.github.bedrock && (
                <div className={styles.contactItem}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className={`${styles.icon} bi bi-github`} viewBox="0 0 16 16">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
                  </svg>
                  <a href={data.contact.github.bedrock}>GitHub (Bedrock)</a>
                </div>
              )}
            </>
          )}
          {data.contact.website && (
            <div className={styles.contactItem}>
              <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className={styles.icon} width={24} height={24}><g clip-path="url(#a)"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.27 14.1a6.5 6.5 0 0 0 3.67-3.45q-1.24.21-2.7.34-.31 1.83-.97 3.1M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.48-1.52a7 7 0 0 1-.96 0H7.5a4 4 0 0 1-.84-1.32q-.38-.89-.63-2.08a40 40 0 0 0 3.92 0q-.25 1.2-.63 2.08a4 4 0 0 1-.84 1.31zm2.94-4.76q1.66-.15 2.95-.43a7 7 0 0 0 0-2.58q-1.3-.27-2.95-.43a18 18 0 0 1 0 3.44m-1.27-3.54a17 17 0 0 1 0 3.64 39 39 0 0 1-4.3 0 17 17 0 0 1 0-3.64 39 39 0 0 1 4.3 0m1.1-1.17q1.45.13 2.69.34a6.5 6.5 0 0 0-3.67-3.44q.65 1.26.98 3.1M8.48 1.5l.01.02q.41.37.84 1.31.38.89.63 2.08a40 40 0 0 0-3.92 0q.25-1.2.63-2.08a4 4 0 0 1 .85-1.32 7 7 0 0 1 .96 0m-2.75.4a6.5 6.5 0 0 0-3.67 3.44 29 29 0 0 1 2.7-.34q.31-1.83.97-3.1M4.58 6.28q-1.66.16-2.95.43a7 7 0 0 0 0 2.58q1.3.27 2.95.43a18 18 0 0 1 0-3.44m.17 4.71q-1.45-.12-2.69-.34a6.5 6.5 0 0 0 3.67 3.44q-.65-1.27-.98-3.1"/></g><defs><clipPath id="a"><path d="M0 0h16v16H0z"/></clipPath></defs></svg>
              <a href={`http://${data.contact.website}`}>{data.contact.website}</a>
            </div>
          )}
        </div>
      </section>

      <section>
        <h2>Summary</h2>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{data.summary}</ReactMarkdown>
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
              {exp.bullets.map((bullet, i) => <li key={i}><ReactMarkdown remarkPlugins={[remarkGfm]}>{bullet}</ReactMarkdown></li>)}
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
                  {project.bullets.map((bullet, i) => <li key={i}><ReactMarkdown remarkPlugins={[remarkGfm]}>{bullet}</ReactMarkdown></li>)}
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