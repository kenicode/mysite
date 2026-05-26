-- Habilitar RLS em todas as tabelas
ALTER TABLE "Project" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Technology" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ProjectTechnology" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ProjectMedia" ENABLE ROW LEVEL SECURITY;

-- Políticas Públicas (Apenas Leitura)
CREATE POLICY "Public projects are viewable by everyone" 
ON "Project" FOR SELECT USING (is_published = true);

CREATE POLICY "Technologies are viewable by everyone" 
ON "Technology" FOR SELECT USING (true);

CREATE POLICY "Project technologies are viewable by everyone" 
ON "ProjectTechnology" FOR SELECT USING (true);

CREATE POLICY "Project media is viewable by everyone" 
ON "ProjectMedia" FOR SELECT USING (true);

-- Políticas Administrativas (CRUD total para usuários logados no Supabase)
-- (Nota: Lembre-se de desativar o cadastro público no dashboard do Supabase Auth)
CREATE POLICY "Admin can do everything on Project" 
ON "Project" FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can do everything on Technology" 
ON "Technology" FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can do everything on ProjectTechnology" 
ON "ProjectTechnology" FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can do everything on ProjectMedia" 
ON "ProjectMedia" FOR ALL USING (auth.role() = 'authenticated');
