import { test, expect } from '@playwright/test';

test('homepage loads and has title', async ({ page }) => {
  await page.goto('/');
  const heading = page.locator('h1');
  await expect(heading).toBeVisible();
});

test('AI assistant chatbot answers resume questions correctly', async ({ page }) => {
  await page.goto('/');

  const inputLocator = page.locator('input[placeholder="Ask about projects, skills…"]');
  const sendButton = page.locator('button.chat-send');

  const testCases = [
    {
      question: "what is medicode ai?",
      expectedText: "Explainable ICD-10 Medical Coding Assistant"
    },
    {
      question: "tell me about deepshield",
      expectedText: "Deepfake Video Detection System"
    },
    {
      question: "how can I contact you?",
      expectedText: "sarasugale@gmail.com"
    },
    {
      question: "where did he study?",
      expectedText: "Nutan College of Engineering & Research"
    }
  ];

  let expectedBotMsgsCount = 1;
  for (const tc of testCases) {
    expectedBotMsgsCount += 1;
    await inputLocator.fill(tc.question);
    await sendButton.click();

    // Wait for the new bot message to appear
    await expect(page.locator('.chat-msg.bot')).toHaveCount(expectedBotMsgsCount);

    // Verify response contains the expected text
    const botMsg = page.locator('.chat-msg.bot').last();
    await expect(botMsg).toContainText(tc.expectedText);
  }
});


