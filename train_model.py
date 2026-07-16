import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
import tensorflow as tf

# Load dataset
df = pd.read_csv("dataset/StudentsPerformance.csv")

# Encode categorical columns
encoder = LabelEncoder()

categorical_columns = [
    "gender",
    "race/ethnicity",
    "parental level of education",
    "lunch",
    "test preparation course"
]

for col in categorical_columns:
    df[col] = encoder.fit_transform(df[col])

# Features
X = df.drop("math score", axis=1)

# Target
y = df["math score"]

# Train-Test Split
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# Build Neural Network
model = tf.keras.Sequential([
    tf.keras.layers.Dense(32, activation='relu', input_shape=(7,)),
    tf.keras.layers.Dense(16, activation='relu'),
    tf.keras.layers.Dense(1)
])

model.compile(
    optimizer='adam',
    loss='mse',
    metrics=['mae']
)

print("Training Started...")

model.fit(
    X_train,
    y_train,
    epochs=100,
    validation_split=0.2,
    verbose=1
)

print("Training Completed!")

loss, mae = model.evaluate(X_test, y_test)

print("\nTest Loss:", loss)
print("Test MAE:", mae)

model.save("model/student_model.keras")

print("\nModel Saved Successfully!")