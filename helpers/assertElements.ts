import { Locator, expect } from '@playwright/test';

/**
 * Asserts that all given elements are visible on the page.
 */
export async function assertVisibleElements(elements: Locator[], description?: string) {
  for (const [index, element] of elements.entries()) {
    const text = await element.textContent();
    console.log(`✅ ${description || 'Element'} ${index + 1} - ${text?.trim() ?? 'no text'} is visible`);
    await expect(element).toBeVisible();
  }
}

/**
 * Asserts that all given input fields are enabled.
 */
export async function assertEnabledFields(fields: Locator[], description?: string) {
  for (const [index, field] of fields.entries()) {
    const text = await field.textContent();
    console.log(`✅ ${description || 'Element'} ${index + 1} - ${text?.trim() ?? 'no text'} is enabled`);
    await expect(field).toBeEnabled();
  }
}

/**
 * Asserts that all given fields are disabled.
 */
export async function assertDisabledFields(fields: Locator[], description?: string) {
  for (const [index, field] of fields.entries()) {
    const text = await field.textContent();
    console.log(`⛔ ${description || 'Field'} ${index + 1} - ${text?.trim() ?? 'no text'} is disabled`);
    await expect(field).not.toBeEnabled();
  }
}
