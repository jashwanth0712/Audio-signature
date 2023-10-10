import random

import numpy as np

from deep_speaker.audio import read_mfcc
from deep_speaker.batcher import sample_from_mfcc
from deep_speaker.constants import SAMPLE_RATE, NUM_FRAMES
from deep_speaker.conv_models import DeepSpeakerModel
from deep_speaker.test import batch_cosine_similarity

def voice_match(clip_path_1 : str, clip_path_2 : str):
    # Reproducible results.
    np.random.seed(123)
    random.seed(123)

    # Define the model here.
    model = DeepSpeakerModel()

    model.m.load_weights('ResCNN_triplet_training_checkpoint_265.h5', by_name=True)

    # Sample some inputs for WAV/FLAC files for the same speaker.
    # To have reproducible results every time you call this function, set the seed every time before calling it.
    # np.random.seed(123)
    # random.seed(123)
    mfcc_001 = sample_from_mfcc(read_mfcc(clip_path_1, SAMPLE_RATE), NUM_FRAMES)
    mfcc_002 = sample_from_mfcc(read_mfcc(clip_path_2, SAMPLE_RATE), NUM_FRAMES)

    # Call the model to get the embeddings of shape (1, 512) for each file.
    predict_001 = model.m.predict(np.expand_dims(mfcc_001, axis=0))
    predict_002 = model.m.predict(np.expand_dims(mfcc_002, axis=0))


    if batch_cosine_similarity(predict_001, predict_002) > 0.7:
        return True
    else:
        return False