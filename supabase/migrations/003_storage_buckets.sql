-- Create storage buckets
INSERT INTO storage.buckets (id, name, public)
VALUES ('posts-images', 'posts-images', true);

INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery-images', 'gallery-images', true);

INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true);

-- Storage policies for posts-images bucket
CREATE POLICY "Posts images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'posts-images');

CREATE POLICY "Authorized users can upload posts images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'posts-images'
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'teacher', 'editor')
    )
  );

CREATE POLICY "Users can update their own posts images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'posts-images'
    AND auth.uid() = owner
  );

CREATE POLICY "Users can delete their own posts images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'posts-images'
    AND auth.uid() = owner
  );

-- Storage policies for gallery-images bucket
CREATE POLICY "Gallery images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'gallery-images');

CREATE POLICY "Authorized users can upload gallery images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'gallery-images'
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'teacher', 'editor')
    )
  );

CREATE POLICY "Users can update their own gallery images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'gallery-images'
    AND auth.uid() = owner
  );

CREATE POLICY "Users can delete their own gallery images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'gallery-images'
    AND auth.uid() = owner
  );

-- Storage policies for avatars bucket
CREATE POLICY "Avatars are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update their own avatar"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'avatars'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own avatar"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'avatars'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );
