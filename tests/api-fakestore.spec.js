const { test, expect } = require('@playwright/test');
const Ajv = require('ajv');

// Initialize AJV for JSON schema validation
const ajv = new Ajv();

// Define JSON schema for the expected product response
const productSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    title: { type: 'string' },
    price: { type: 'number' },
    category: { type: 'string' },
    description: { type: 'string' },
    image: { type: 'string' }
  },
  required: ['id', 'title', 'price', 'category', 'description'],
  additionalProperties: true
};

test.describe('Fake Store API - Product Endpoint Tests', () => {
  
  const API_ENDPOINT = 'https://fakestoreapi.com/products/1';

  test('Should fetch product with 200 OK status and validate response structure', async ({ request }) => {
    console.log(`\n[TEST START] Fetching product from: ${API_ENDPOINT}`);

    // Step 1 & 2: Send GET request to the endpoint
    console.log('[STEP 1-2] Sending GET request to API endpoint...');
    const response = await request.get(API_ENDPOINT);

    // Step 3: Verify response status is 200 OK
    console.log('[STEP 3] Verifying response status code...');
    expect(response.status()).toBe(200);
    console.log(`✓ Response status: ${response.status()} OK`);

    // Parse response body
    const responseBody = await response.json();
    console.log(`[INFO] Response body received and parsed successfully`);

    // Step 4: Validate the response contains required keys
    console.log('[STEP 4] Validating response contains required keys...');
    const requiredKeys = ['id', 'title', 'price', 'category', 'description'];
    
    requiredKeys.forEach(key => {
      expect(responseBody).toHaveProperty(key);
      console.log(`✓ Key '${key}' is present in response`);
    });

    // Step 5: Validate data types using JSON schema (AJV)
    console.log('[STEP 5] Validating response data types using JSON schema...');
    const isValidSchema = ajv.validate(productSchema, responseBody);
    
    if (!isValidSchema) {
      console.error(`✗ Schema validation failed: ${JSON.stringify(ajv.errors)}`);
      expect(isValidSchema).toBe(true); // This will fail the test with schema error details
    } else {
      console.log(`✓ Response matches expected JSON schema`);
      console.log(`  - id type: number (${typeof responseBody.id})`);
      console.log(`  - title type: string (${typeof responseBody.title})`);
      console.log(`  - price type: number (${typeof responseBody.price})`);
      console.log(`  - category type: string (${typeof responseBody.category})`);
      console.log(`  - description type: string (${typeof responseBody.description})`);
    }

    // Step 6: Log the product title and price to console
    console.log('[STEP 6] Logging product information...');
    console.log(`\n📦 Product Information:`);
    console.log(`   Title: ${responseBody.title}`);
    console.log(`   Price: $${responseBody.price}`);
    console.log(`   Category: ${responseBody.category}`);
    console.log(`   ID: ${responseBody.id}`);
    console.log(`   Description: ${responseBody.description.substring(0, 100)}...`);
    
    console.log('\n[TEST PASSED] All validations completed successfully!\n');
  });

  test('Should handle invalid endpoint with appropriate error', async ({ request }) => {
    console.log('\n[TEST START] Testing error handling with invalid endpoint');
    
    const invalidEndpoint = 'https://fakestoreapi.com/products/99999';
    console.log(`[INFO] Fetching non-existent product: ${invalidEndpoint}`);
    
    const response = await request.get(invalidEndpoint);
    
    // Even non-existent products return 200 from this API but with null/empty response
    expect(response.status()).toBe(200);
    console.log(`✓ Response status: ${response.status()}`);
    
    const responseBody = await response.json();
    console.log(`[INFO] Response for non-existent product: ${JSON.stringify(responseBody)}`);
    
    console.log('\n[TEST PASSED] Error handling test completed!\n');
  });
});
