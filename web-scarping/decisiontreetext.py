import pandas
import string
import nltk
import keras
import sklearn
import time
from keras.models import Sequential
from keras.layers import Dense
import matplotlib.pyplot as plt
import numpy
import tensorflow as tf
import numpy as np
from time import time
from nltk.corpus import stopwords
from pandas import read_csv
from pandas.plotting import scatter_matrix
from matplotlib import pyplot
from keras.models import Sequential
from keras.layers import Dense
from keras.wrappers.scikit_learn import KerasClassifier
from sklearn.model_selection import cross_val_score
from sklearn.preprocessing import LabelEncoder
from sklearn.preprocessing import OneHotEncoder
from sklearn.model_selection import StratifiedKFold
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from keras.callbacks import TensorBoard
from keras.preprocessing.text import Tokenizer
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from keras.models import Sequential
from keras.layers import Dense , Activation , Dropout
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import LabelBinarizer
from sklearn.preprocessing import MultiLabelBinarizer
import keras.preprocessing.text

print("test")