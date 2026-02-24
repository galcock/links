// Student AI Assistant with Content Guardrails
// FERPA/COPPA Compliant - No assignment completion, age-appropriate content

const BLOCKED_TOPICS = [
  'violence',
  'weapons',
  'drugs',
  'alcohol',
  'adult content',
  'gambling',
  'hate speech',
  'self-harm',
  'bullying',
];

const ASSIGNMENT_COMPLETION_PATTERNS = [
  /write\s+(my|the|this)\s+(essay|paper|assignment|homework)/i,
  /do\s+(my|the|this)\s+(homework|assignment|project)/i,
  /complete\s+(my|the|this)\s+(assignment|homework|work)/i,
  /finish\s+(my|the|this)\s+(essay|paper|assignment)/i,
  /answer\s+(these|the|my)\s+questions?\s+for\s+me/i,
  /solve\s+(these|the|my)\s+problems?\s+for\s+me/i,
];

const ASSISTANCE_PHRASES = [
  'I can help you understand',
  'Let me explain the concept',
  "Here's how you might approach",
  'Consider these steps',
  'Think about it this way',
];

interface ContentFilterResult {
  isBlocked: boolean;
  reason?: string;
  modifiedContent?: string;
}

interface AssignmentCheckResult {
  isAssignmentRequest: boolean;
  alternativeResponse?: string;
}

export function filterContent(content: string): ContentFilterResult {
  const lowerContent = content.toLowerCase();
  
  for (const topic of BLOCKED_TOPICS) {
    if (lowerContent.includes(topic)) {
      return {
        isBlocked: true,
        reason: `Content related to "${topic}" is not allowed in the educational environment.`,
      };
    }
  }

  return { isBlocked: false };
}

export function checkAssignmentCompletion(prompt: string): AssignmentCheckResult {
  for (const pattern of ASSIGNMENT_COMPLETION_PATTERNS) {
    if (pattern.test(prompt)) {
      return {
        isAssignmentRequest: true,
        alternativeResponse: `I'm here to help you learn, not to do your work for you! 📚

Instead, I can:
• Explain concepts you're struggling with
• Help you brainstorm ideas
• Walk you through problem-solving steps
• Clarify assignment requirements
• Point you to helpful resources

What specific part of the assignment would you like help understanding?`,
      };
    }
  }

  return { isAssignmentRequest: false };
}

export function getAgeAppropriateSystemPrompt(gradeLevel: number): string {
  let complexity = 'simple and clear';
  let tone = 'friendly and encouraging';
  
  if (gradeLevel >= 9) {
    complexity = 'detailed and thorough';
    tone = 'professional yet approachable';
  } else if (gradeLevel >= 6) {
    complexity = 'moderately detailed';
    tone = 'supportive and engaging';
  }

  return `You are LINKS AI, an educational assistant for students. 

IMPORTANT RULES:
1. NEVER complete assignments, homework, essays, or projects for students
2. ALWAYS guide students to find answers themselves through explanation and hints
3. Keep responses age-appropriate for grade ${gradeLevel} students
4. Use ${complexity} language
5. Maintain a ${tone} tone
6. Encourage critical thinking and learning
7. Do not discuss inappropriate topics
8. If asked about sensitive topics, redirect to appropriate school resources
9. Always cite when providing factual information
10. Encourage students to verify information with teachers and textbooks

You help with:
- Understanding concepts and lessons
- Study strategies and tips
- Explaining difficult topics
- Practice problems (without giving direct answers)
- Research guidance
- Time management and organization`;
}

export function wrapAIResponse(response: string): string {
  return `🤖 **AI Assistant Response**

${response}

---
*This is an AI-generated response. Please verify important information with your teacher or textbook.*`;
}

export interface AIRequestContext {
  userId: string;
  gradeLevel: number;
  subject?: string;
  conversationHistory?: Array<{ role: string; content: string }>;
}

export async function processStudentAIRequest(
  prompt: string,
  context: AIRequestContext
): Promise<{
  success: boolean;
  response?: string;
  filtered?: boolean;
  filterReason?: string;
}> {
  // Check for content violations
  const contentFilter = filterContent(prompt);
  if (contentFilter.isBlocked) {
    return {
      success: false,
      filtered: true,
      filterReason: contentFilter.reason,
      response: `I'm not able to help with that topic. ${contentFilter.reason} If you have questions about school-appropriate topics, I'm happy to help!`,
    };
  }

  // Check for assignment completion requests
  const assignmentCheck = checkAssignmentCompletion(prompt);
  if (assignmentCheck.isAssignmentRequest) {
    return {
      success: true,
      filtered: true,
      filterReason: 'Assignment completion request redirected',
      response: assignmentCheck.alternativeResponse,
    };
  }

  // Process with AI (placeholder - would integrate with actual AI service)
  const systemPrompt = getAgeAppropriateSystemPrompt(context.gradeLevel);
  
  // In production, this would call the actual AI API
  // For now, return a helpful placeholder
  return {
    success: true,
    response: wrapAIResponse(
      `I understand you're asking about: "${prompt.slice(0, 100)}..."

To help you learn effectively, let me guide you through this concept step by step. What specific aspect would you like me to explain first?`
    ),
  };
}

export function logAIInteraction(
  userId: string,
  prompt: string,
  response: string,
  filtered: boolean,
  filterReason?: string
) {
  // In production, this would log to the audit system
  console.log('[AI Interaction]', {
    userId,
    timestamp: new Date().toISOString(),
    promptLength: prompt.length,
    responseLength: response.length,
    filtered,
    filterReason,
  });
}
