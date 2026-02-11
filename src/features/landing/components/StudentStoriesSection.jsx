import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import './StudentStoriesSection.css';
import avneetCard from '../../../assets/story_card_avneet.png';
import manishCard from '../../../assets/story_card_manish.jpg';
import manishaCard from '../../../assets/story_card_manisha.jpg';
import sanjuktaCard from '../../../assets/story_card_sanjukta.jpg';

const StudentStoriesSection = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleStartJourney = () => {
        if (user) {
            navigate('/dashboard');
        } else {
            navigate('/login');
        }
    };

    // Data matching the screenshot requirements
    // Screenshot shows Manisha Rani and Manish Gupta
    const stories = [
        {
            name: "Manisha Rani",
            uni: "Arizona State University",
            country: "USA",
            image: manishaCard,
            colorClass: "card-blue"
        },
        {
            name: "Manish Gupta",
            uni: "University of Winnipeg",
            country: "CANADA",
            image: manishCard,
            colorClass: "card-green"
        }
        // Add more if needed, but screenshot implies a focused list
    ];

    return (
        <section className="stories-section" id="student-stories">
            <div className="stories-container">
                <div className="stories-content">
                    <h2 className="stories-title">
                        From Kolkata to<br />
                        Canada in 6<br />
                        Months
                    </h2>
                    <p className="stories-description">
                        Read how Tanisha got her German visa on the first try and achieved her
                        study abroad dreams.
                    </p>
                    <button
                        className="btn-view-stories"
                        onClick={() => navigate('/student-stories')}
                    >
                        View Student Stories
                    </button>
                </div>

                <div className="stories-visuals">
                    <div className="pill-decoration pill-top"></div>
                    <div className="stories-stack">
                        {stories.map((story, index) => (
                            <div key={index} className={`story-pill-card ${story.colorClass}`}>
                                <img src={story.image} alt={story.name} className="story-pill-img" />
                                <div className="story-pill-info">
                                    <h4 className="story-pill-name">{story.name}</h4>
                                    <p className="story-pill-uni">{story.uni}</p>
                                    <p className="story-pill-country">{story.country}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StudentStoriesSection;
