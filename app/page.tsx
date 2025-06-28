
import React from 'react';

const baseSectionStyle = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontFamily: 'sans-serif',
};

const HomePage = () => (
  <>
    {/* Hero / Top Banner */}
    <div style={{ ...baseSectionStyle, backgroundColor: '#0d1b2a' , height: "30vh"}}>
      <h1>Echo Interview</h1>
      {/* insert hero image/text here */}
    </div>

    {/* Features Grid */}
    <div style={{ ...baseSectionStyle, backgroundColor: '#415a77' }}>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <div>[Icon]
          <p>
            Login or Signup
          </p>
        </div>
        <div>[Icon]
          <p>
            Create Profile for Custom Tailored Interview
          </p>
        </div>
        <div>[Icon]
          <p>
            Take Mock Interview with AI guidance and assistance!
          </p>
        </div>
        <div>[Icon]
          <p>
            Review interview performance and continue to improve!
          </p>
        </div>
      </div>
    </div>

    {/* Footer / Extra Info */}
    <div style={{ ...baseSectionStyle, backgroundColor: '#778da9' }}>
      <p>Footer / additional info</p>
    </div>
  </>
);

export default HomePage;