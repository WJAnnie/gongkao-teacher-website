import type { ReactNode } from 'react';
import { LearningPageFrame } from '../learning-page-frame';
import { learningPageChapters } from '../learning-routes';
import './interview-learning.css';

type InterviewTone = 'methods' | 'questions' | 'expression' | 'videos';

const toneToActive = {
  methods: 'interview-methods',
  questions: 'interview-questions',
  expression: 'interview-expression',
  videos: 'interview-videos',
} as const;

export function InterviewShell({ tone, eyebrow, title, desc, children }: { tone: InterviewTone; eyebrow: string; title: string; desc: string; children: ReactNode }) {
  const active = toneToActive[tone];
  return <LearningPageFrame
    active={active}
    chapters={learningPageChapters[active]}
    desc={desc}
    eyebrow={eyebrow}
    legacyClassName={`interview-site interview-tone-${tone}`}
    subject="interview"
    title={title}
  >{children}</LearningPageFrame>;
}
