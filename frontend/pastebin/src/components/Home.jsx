import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './Home.css';

function Home() {
    const [category, setCategory] = useState("");
    const [syntax, setSyntax] = useState("");
    const [expiration, setExpiration] = useState("")
    const [content, setContent] = useState("");
    const [shareUrl, setShareUrl] = useState("");

    const handleContentChange = (e) => {
        setContent(e.target.value)
    }
    
    const handleCategoryChange = (e)=>{
        setCategory(e.target.value);
    }

    const handleSyntaxChange = (e)=>{
        setSyntax(e.target.value);
    }

    const handleExpirationChange = (e)=>{
        setExpiration(e.target.value)
    }

    const handleSubmit = async(e)=>{
          e.preventDefault();
          const res = await fetch("http://localhost:8000/api/pastes", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                content,
                category,
                syntax,
                expiration
            })
          });
          const data = await res.json();
          setShareUrl(data.url)
    }
    return (
        <div>
            <header>PASTEBIN LITE</header>

            <form onSubmit={handleSubmit}>
                <h3>New Paste</h3>
                <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={8}
                    sx={{ width: '70%' }}
                    onChange={handleContentChange}
                />
                <div className='content_title' style={{ marginTop: '10px', fontFamily: 'serif' }}>
                    <h3>Optional Paste Settings</h3>
                </div><hr></hr>
                <div className='post-form-bottom'>
                    <div className='form-column'>
                        <div className='form-row'>
                            <label>Category:</label>
                            <FormControl sx={{ m: 1, minWidth: 300 }}>
                                <Select
                                    value={category}
                                    onChange={handleCategoryChange}
                                    displayEmpty
                                    sx={{ height: '40px', fontFamily: 'serif' }}
                                >
                                    <MenuItem value="" style={{ fontFamily: 'serif' }}>
                                        None
                                    </MenuItem>
                                    <MenuItem value="cryptocurrency" style={{ fontFamily: 'serif' }}>Cryptocurrency</MenuItem>
                                    <MenuItem value="Fixit" style={{ fontFamily: 'serif' }}>Fixit</MenuItem>
                                    <MenuItem value="History" style={{ fontFamily: 'serif' }}>History</MenuItem>
                                    <MenuItem value="Software" style={{ fontFamily: 'serif' }}>Software</MenuItem>
                                    <MenuItem value="Writing" style={{ fontFamily: 'serif' }}>Writing</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <div className='form-row'>
                            <label>Syntax Highlighting:</label>
                            <FormControl sx={{ m: 1, minWidth: 300 }}>
                                <Select
                                    value={syntax}
                                    onChange={handleSyntaxChange}
                                    displayEmpty
                                    sx={{ height: '40px', fontFamily: 'serif' }}
                                >
                                    <MenuItem value="" style={{ fontFamily: 'serif' }}>
                                        None
                                    </MenuItem>
                                    <MenuItem value="Bash" style={{ fontFamily: 'serif' }}>Bash</MenuItem>
                                    <MenuItem value="C" style={{ fontFamily: 'serif' }}>C</MenuItem>
                                    <MenuItem value="C++" style={{ fontFamily: 'serif' }}>C++</MenuItem>
                                    <MenuItem value="CSS" style={{ fontFamily: 'serif' }}>CSS</MenuItem>
                                    <MenuItem value="HTML" style={{ fontFamily: 'serif' }}>HTML</MenuItem>
                                    <MenuItem value="Java" style={{ fontFamily: 'serif' }}>Java</MenuItem>
                                    <MenuItem value="JavaScript" style={{ fontFamily: 'serif' }}>JavaScript</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <div className='form-row'>
                            <label>Paste Expiration:</label>
                            <FormControl sx={{ m: 1, minWidth: 300 }}>
                                <Select
                                    value={expiration}
                                    onChange={handleExpirationChange}
                                    displayEmpty
                                    sx={{ height: '40px', fontFamily: 'serif' }}
                                >
                                    <MenuItem value="" style={{ fontFamily: 'serif' }}>
                                        Never
                                    </MenuItem>
                                    <MenuItem value="10min" style={{ fontFamily: 'serif' }}>10 Minutes</MenuItem>
                                    <MenuItem value="1hr" style={{ fontFamily: 'serif' }}>1 Hour</MenuItem>
                                    <MenuItem value="1day" style={{ fontFamily: 'serif' }}>1 Day</MenuItem>
                                    <MenuItem value="1week" style={{ fontFamily: 'serif' }}>1 week</MenuItem>
                                    <MenuItem value="2week" style={{ fontFamily: 'serif' }}>2 Weeks</MenuItem>
                                    <MenuItem value="1month" style={{ fontFamily: 'serif' }}>1 Month</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <div className='form-row'>
                            <label>Paste Name:</label>
                            <input type='text' className='form-input' style={{ height: '35px', minWidth: '300px', fontFamily: 'serif' }} />
                        </div>
                    </div>

                    <div className='form-btn'>
                        <button>Create New Paste</button>
                    </div>
                </div>
            </form>
            {shareUrl && (
                <div style={{marginTop: "20px"}}>
                    <p>paste created successfully</p>
                    <a href={shareUrl} target='_blank' rel='noreferrer'>
                        {shareUrl}
                    </a>
                </div>
            )}
        </div>
    )
}

export default Home
