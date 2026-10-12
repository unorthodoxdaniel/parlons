import {test} from 'node:test';
import assert from 'node:assert/strict';
import {callbackUrl, validEmail, validCode} from './auth-rules.ts';
test('OAuth callback always belongs to this site, with no supplied redirect',()=>{
 assert.equal(callbackUrl('https://parlons.example'),'https://parlons.example/auth/callback/');
});
test('email and OTP validation reject malformed input',()=>{
 assert.equal(validEmail('learner@example.com'),true); assert.equal(validEmail('no-at-sign'),false);
 assert.equal(validCode('123456'),true); assert.equal(validCode('12345678'),true);
 assert.equal(validCode('<script>'),false); assert.equal(validCode('12345'),false);
});
