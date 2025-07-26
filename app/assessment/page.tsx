'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface QuestionData {
  question: string;
  options: string[];
}

export default function MentalHealthQuestionnaire() {
  const [currentQuestion, setCurrentQuestion] = useState<QuestionData | null>(null);
  const [responses, setResponses] = useState<{ question: string; answer: string }[]>([]);
  const [insights, setInsights] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postPayload = async (payload: any) => {
    console.log('[FE] posting to /api/questionnaire:', payload);
    const res = await fetch('/api/questionnaire', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    console.log('[FE] response status:', res.status, res.statusText);
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP ${res.status}: ${text}`);
    }
    return res.json();
  };

  const fetchNextQuestion = async (prev?: string) => {
    setError(null);
    setIsLoading(true);
    try {
      const data = await postPayload({ previousAnswer: prev });
      console.log('[FE] received question data:', data);
      setCurrentQuestion(data);
    } catch (e: any) {
      console.error('[FE] fetchNextQuestion error:', e);
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const analyzeResponses = async (all: typeof responses) => {
    setError(null);
    setIsLoading(true);
    try {
      const data = await postPayload({ pathname: '/analyze', responses: all });
      console.log('[FE] analysis result:', data);
      setInsights(data.insights);
    } catch (e: any) {
      console.error('[FE] analyzeResponses error:', e);
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNextQuestion();
  }, []);

  const handleAnswer = (answer: string) => {
    if (!currentQuestion) return;
    const newList = [...responses, { question: currentQuestion.question, answer }];
    setResponses(newList);

    if (newList.length >= 5) {
      analyzeResponses(newList);
    } else {
      fetchNextQuestion(answer);
    }
  };

  if (isLoading) return <p>Loading…</p>;
  if (error)    return (
    <div>
      <p className="text-red-600">Error: {error}</p>
      <button onClick={() => fetchNextQuestion()}>Retry</button>
    </div>
  );
  if (insights) return <div>{insights}</div>;
  if (!currentQuestion) return null;

  return (
    <div>
      <h2>{currentQuestion.question}</h2>
      {currentQuestion.options.map((opt, i) => (
        <Button key={i} onClick={() => handleAnswer(opt)}>
          {opt}
        </Button>
      ))}
      <p>Question {responses.length + 1} / 5</p>
    </div>
  );
}
