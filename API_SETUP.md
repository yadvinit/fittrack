# 🔑 API Setup Guide - API-Ninjas Exercise Database

## Overview

The application now uses **API-Ninjas Exercise Database** which provides:
- ✅ Clean, structured exercise data
- ✅ Muscle group information
- ✅ Difficulty levels (beginner, intermediate, expert)
- ✅ Exercise types (strength, cardio, plyometrics, etc.)
- ✅ Equipment requirements
- ✅ Detailed instructions

## Getting Your Free API Key

### Step 1: Sign Up (Free)

1. Visit [https://api-ninjas.com](https://api-ninjas.com)
2. Click **"Sign Up"** in the top right
3. Create a free account with email
4. Verify your email address

### Step 2: Get Your API Key

1. Log in to your API-Ninjas account
2. Go to **"My Account"** or dashboard
3. Find your **API Key** (it looks like: `HBuFqJHQO0F7GRLbFnzRZQ==DsONJ3gKiFYWJTN5`)
4. Copy the key

### Step 3: Update Your App

1. Open the file: `src/services/exerciseService.js`
2. Find line 5:
   ```javascript
   const API_NINJAS_KEY = 'HBuFqJHQO0F7GRLbFnzRZQ==DsONJ3gKiFYWJTN5';
   ```
3. Replace the demo key with your own key:
   ```javascript
   const API_NINJAS_KEY = 'YOUR_API_KEY_HERE';
   ```
4. Save the file

### Step 4: Test the Integration

1. Restart your dev server if needed
2. Navigate to **Browse Exercises** page
3. Search should now return exercises from API-Ninjas

## Free Tier Limits

API-Ninjas Free Tier includes:
- **50,000 API calls per month**
- **No credit card required**
- **All exercise database features**

For this fitness app, 50,000 calls is more than enough for personal use!

## Fallback System

Don't worry if you can't get an API key immediately! The app includes:

✅ **Offline Fallback Database** - 20 popular exercises built-in
✅ **Automatic Fallback** - Switches to offline data if API fails
✅ **Seamless Experience** - Users won't notice the difference

The fallback exercises include:
- Barbell Bench Press
- Squats
- Deadlift
- Pull-ups
- Running
- Push-ups
- Plank
- Lunges
- And more...

## API Features Used

### Search by Name
```javascript
GET /v1/exercises?name=bench press
```

### Filter by Muscle Group
```javascript
GET /v1/exercises?muscle=chest
```

### Filter by Difficulty
```javascript
GET /v1/exercises?difficulty=beginner
```

### Filter by Type
```javascript
GET /v1/exercises?type=strength
```

## Exercise Data Structure

Each exercise includes:
```javascript
{
  name: "Barbell Bench Press",
  type: "strength",
  muscle: "chest",
  difficulty: "beginner",
  equipment: "barbell",
  instructions: "Detailed step-by-step instructions..."
}
```

## Available Muscle Groups

- chest
- biceps
- triceps
- forearms
- shoulders (deltoids)
- abdominals
- quadriceps
- hamstrings
- calves
- glutes
- lats (back)
- lower_back
- middle_back
- traps
- neck

## Available Exercise Types

- strength
- cardio
- plyometrics
- powerlifting
- strongman
- stretching
- olympic_weightlifting

## Difficulty Levels

- **beginner** - Suitable for beginners
- **intermediate** - Requires some experience
- **expert** - Advanced exercises

## Troubleshooting

### Issue: "API Key Invalid"
**Solution:** 
- Verify you copied the entire key
- Check for extra spaces
- Make sure you're using your own key, not the demo key

### Issue: "API Rate Limit Exceeded"
**Solution:**
- You've used your monthly 50,000 calls
- App will automatically use fallback database
- Consider upgrading API plan if needed

### Issue: "No exercises showing"
**Solution:**
- Check internet connection
- Verify API key is correct
- Check browser console for errors
- Fallback database should still work

### Issue: "CORS Error"
**Solution:**
- API-Ninjas has CORS enabled, this shouldn't happen
- If it does, the fallback system will activate
- Check that you're using the correct API endpoint

## Environment Variables (Optional)

For better security in production, you can use environment variables:

1. Create `.env` file in root:
   ```env
   VITE_API_NINJAS_KEY=your_api_key_here
   ```

2. Update `exerciseService.js`:
   ```javascript
   const API_NINJAS_KEY = import.meta.env.VITE_API_NINJAS_KEY || 'demo_key';
   ```

3. Add `.env` to `.gitignore`:
   ```
   .env
   .env.local
   ```

## API Documentation

Full API documentation: [https://api-ninjas.com/api/exercises](https://api-ninjas.com/api/exercises)

## Why API-Ninjas?

Compared to the previous Wger API, API-Ninjas offers:

| Feature | API-Ninjas | Wger |
|---------|-----------|------|
| Requires API Key | Yes (free) | No |
| Data Quality | Excellent | Good |
| Difficulty Levels | ✅ Yes | ❌ No |
| Exercise Types | ✅ Yes | Limited |
| Clean Data | ✅ Yes | HTML cleanup needed |
| Rate Limits | 50k/month | None specified |
| Documentation | Excellent | Good |
| Reliability | High | Medium |

## Alternative APIs (if needed)

If API-Ninjas doesn't work for you, consider:

1. **ExerciseDB (RapidAPI)**
   - URL: https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb
   - Includes GIFs and images
   - Free tier: 100 requests/day
   - Requires RapidAPI account

2. **Wger (Previous API)**
   - URL: https://wger.de/api/v2
   - No API key needed
   - Open source
   - Large database

## Summary

✅ **Current Setup:** API-Ninjas with free 50k requests/month  
✅ **Fallback System:** Built-in offline database  
✅ **No Blocking:** App works even without API key  
✅ **Easy Setup:** Just replace one line of code  

You're all set! The exercise browsing feature now uses a modern, reliable API with rich exercise data.

---

**Questions?** Check the main README.md or the API-Ninjas documentation.
