#import wordnet
import nltk
from nltk.corpus import wordnet as wn
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer
from nltk.stem import LancasterStemmer
from nltk.stem import SnowballStemmer

#test wordnet for synonyms
word = 'artificial intelligence'
syns = wn.synsets(word)
print(syns)
# get example sentences
# example = syns[0].examples()
#print(example)

# compare similarity between two words
# w1 = wn.synset('ship.n.01')
# w2 = wn.synset('car.n.01')
# print(w1.wup_similarity(w2))
