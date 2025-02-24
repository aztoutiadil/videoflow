import assemblyai as aai

# Replace with your AssemblyAI API key
aai.settings.api_key = "d3c58cb136044f3ebdaea0813e1ebc76"

def transcribe_audio(file_url):
    """
    Transcribe an audio or video file using AssemblyAI.
    
    Args:
        file_url (str): URL of the audio/video file to transcribe.
    
    Returns:
        str: The transcribed text.
    """
    transcriber = aai.Transcriber()
    transcript = transcriber.transcribe(file_url)

    if transcript.status == aai.TranscriptStatus.error:
        raise Exception(f"Transcription failed: {transcript.error}")
    else:
        return transcript.text
    
















