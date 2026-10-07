import React, { useState } from 'react';
import { SAMPLE_DATASET } from '../data/sampleDataset';
import { DRIVE_CLASSES, GOOGLE_DRIVE_DATASET_CONFIG, DriveClassInfo, getDriveImageUrl } from '../data/driveDataset';
import { SampleDatasetItem, CropType, DiseaseCategory } from '../types';
import {
  BookOpen,
  Search,
  Filter,
  Play,
  CheckCircle2,
  ShieldCheck,
  ExternalLink,
  FolderOpen,
  Database,
  Image as ImageIcon,
  Layers,
  Sparkles,
  ArrowUpRight,
  Info,
} from 'lucide-react';

interface DatasetBrowserProps {
  onSelectSample: (item: SampleDatasetItem) => void;
}

export const DatasetBrowser: React.FC<DatasetBrowserProps> = ({ onSelectSample }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [cropFilter, setCropFilter] = useState<'All' | 'Rice' | 'Corn'>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [activeViewMode, setActiveViewMode] = useState<'driveGallery' | 'cards'>('driveGallery');
  const [selectedClassForPreview, setSelectedClassForPreview] = useState<DriveClassInfo | null>(DRIVE_CLASSES[0]);

  // Filter Google Drive Classes
  const filteredDriveClasses = DRIVE_CLASSES.filter((cls) => {
    const matchesSearch =
      cls.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.scientificName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.distinguishingFeatures.some((f) => f.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCrop = cropFilter === 'All' || cls.crop === cropFilter;
    const matchesCategory = categoryFilter === 'All' || cls.category === categoryFilter;

    return matchesSearch && matchesCrop && matchesCategory;
  });

  // Filter Botanical Reference Cards
  const filteredDataset = SAMPLE_DATASET.filter((item) => {
    const matchesSearch =
      (item.diseaseName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.scientificName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCrop = cropFilter === 'All' || item.crop === cropFilter;
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;

    return matchesSearch && matchesCrop && matchesCategory;
  });

  // Handle Testing a specimen directly from Google Drive
  const handleTestDriveSpecimen = (cls: DriveClassInfo, img: { id: string; name: string }) => {
    const sampleItem: SampleDatasetItem = {
      id: img.id,
      crop: cls.crop,
      diseaseName: cls.className,
      scientificName: cls.scientificName,
      category: cls.category as DiseaseCategory,
      severity: cls.className.includes('Healthy') ? 'Healthy' : 'Severe',
      description: `Real field specimen "${img.name}" from Google Drive dataset "${GOOGLE_DRIVE_DATASET_CONFIG.name}". Folder: ${cls.className}.`,
      keySymptoms: cls.distinguishingFeatures,
      sampleImageUrl: getDriveImageUrl(img.id),
      laymanSummary: `Specimen from connected dataset ${GOOGLE_DRIVE_DATASET_CONFIG.name} under ${cls.className}.`,
    };
    onSelectSample(sampleItem);
  };

  return (
    <div className="space-y-6">
      
      {/* 🚀 GOOGLE DRIVE CONNECTION BANNER */}
      <div className="bg-gradient-to-br from-[#064e3b] via-[#043e2f] to-[#022c22] border-2 border-amber-500/50 rounded-2xl p-6 shadow-xl text-white relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full bg-amber-400 text-emerald-950 font-extrabold text-xs shadow-sm flex items-center space-x-1.5">
                <Database className="w-3.5 h-3.5" />
                <span>CONNECTED DATASET</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-500/40 text-emerald-200 text-xs font-semibold flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Live Google Drive Sync</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center space-x-2">
              <span>{GOOGLE_DRIVE_DATASET_CONFIG.name}</span>
            </h2>

            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-2xl leading-relaxed">
              Diagnostic pipeline is grounded in this repository containing <strong className="text-amber-300">23 balanced disease classes</strong> (14 Rice + 9 Corn) with over <strong className="text-amber-300">1,000+ validated field specimens</strong>.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono text-emerald-200">
              <span className="bg-black/30 px-2.5 py-1 rounded-md border border-white/10">
                Folder ID: <strong className="text-amber-300">{GOOGLE_DRIVE_DATASET_CONFIG.rootFolderId}</strong>
              </span>
              <span className="bg-black/30 px-2.5 py-1 rounded-md border border-white/10">
                Rice Classes: <strong>14</strong>
              </span>
              <span className="bg-black/30 px-2.5 py-1 rounded-md border border-white/10">
                Corn Classes: <strong>9</strong>
              </span>
            </div>
          </div>

          {/* Quick Drive Links */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 flex-shrink-0">
            <a
              href={GOOGLE_DRIVE_DATASET_CONFIG.rootDriveUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-emerald-950 font-extrabold text-xs flex items-center justify-center space-x-2 shadow-md transition-all active:scale-95"
            >
              <FolderOpen className="w-4 h-4 fill-current" />
              <span>Open Root Folder in Google Drive</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <div className="flex items-center space-x-2">
              <a
                href={GOOGLE_DRIVE_DATASET_CONFIG.riceDriveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold text-center flex items-center justify-center space-x-1.5 transition-all"
              >
                <span>🌾 Rice Classes (14)</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-amber-300" />
              </a>

              <a
                href={GOOGLE_DRIVE_DATASET_CONFIG.cornDriveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold text-center flex items-center justify-center space-x-1.5 transition-all"
              >
                <span>🌽 Corn Classes (9)</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-amber-300" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* SEARCH, FILTERS & VIEW MODE SELECTOR */}
      <div className="bg-white border border-emerald-900/10 rounded-2xl p-5 shadow-md space-y-4">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* View Mode Toggle */}
          <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200">
            <button
              onClick={() => setActiveViewMode('driveGallery')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-2 transition-all ${
                activeViewMode === 'driveGallery'
                  ? 'bg-[#064e3b] text-white shadow-sm ring-1 ring-amber-400'
                  : 'text-slate-600 hover:text-emerald-950'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5 text-amber-300" />
              <span>Live Google Drive Specimen Gallery</span>
            </button>
            <button
              onClick={() => setActiveViewMode('cards')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-2 transition-all ${
                activeViewMode === 'cards'
                  ? 'bg-[#064e3b] text-white shadow-sm ring-1 ring-amber-400'
                  : 'text-slate-600 hover:text-emerald-950'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-300" />
              <span>Botanical Cards &amp; Diagnostic Rubric</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search diseases, symptoms, or files..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
          </div>

        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-emerald-900/10 text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-slate-600 font-bold">Crop:</span>
            <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200">
              {(['All', 'Rice', 'Corn'] as const).map((crop) => (
                <button
                  key={crop}
                  onClick={() => setCropFilter(crop)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    cropFilter === crop
                      ? 'bg-[#064e3b] text-white font-bold ring-1 ring-amber-400 shadow-sm'
                      : 'text-slate-600 hover:text-emerald-950'
                  }`}
                >
                  {crop}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-slate-600 font-bold">Category:</span>
            <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200">
              {(['All', 'Fungal', 'Bacterial', 'Viral', 'Healthy'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    categoryFilter === cat
                      ? 'bg-[#064e3b] text-white font-bold ring-1 ring-amber-400 shadow-sm'
                      : 'text-slate-600 hover:text-emerald-950'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="ml-auto text-xs text-slate-500 font-medium">
            Showing <strong className="text-emerald-950">{activeViewMode === 'driveGallery' ? filteredDriveClasses.length : filteredDataset.length}</strong> classes
          </div>
        </div>

      </div>

      {/* VIEW MODE 1: LIVE GOOGLE DRIVE SPECIMEN GALLERY */}
      {activeViewMode === 'driveGallery' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDriveClasses.map((cls) => (
              <div
                key={cls.folderId}
                className="bg-white border border-emerald-900/10 rounded-2xl overflow-hidden shadow-md hover:border-amber-500/60 hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Card Header */}
                  <div className="p-4 bg-slate-50 border-b border-emerald-900/10 flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-bold">
                          {cls.crop}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-semibold">
                          {cls.category}
                        </span>
                      </div>
                      <h3 className="text-base font-extrabold text-emerald-950 mt-1">
                        {cls.className}
                      </h3>
                      <p className="text-[11px] italic text-slate-500">{cls.scientificName}</p>
                    </div>

                    <a
                      href={cls.driveUrl}
                      target="_blank"
                      rel="noreferrer"
                      title="Open class folder in Google Drive"
                      className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-emerald-900 hover:border-amber-400 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Sample Specimens Carousel / Grid */}
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-700 flex items-center space-x-1">
                        <ImageIcon className="w-3.5 h-3.5 text-emerald-800" />
                        <span>Field Leaf Specimens in Drive:</span>
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-300 font-mono text-[10px] font-bold">
                        {cls.totalCount > 0 ? `${cls.totalCount} photos` : 'Class Defined'}
                      </span>
                    </div>

                    {cls.sampleImages.length > 0 ? (
                      <div className="grid grid-cols-3 gap-2">
                        {cls.sampleImages.slice(0, 3).map((img) => (
                          <div
                            key={img.id}
                            className="group relative rounded-xl overflow-hidden bg-slate-100 border border-slate-200 aspect-square flex flex-col justify-end"
                          >
                            <img
                              src={getDriveImageUrl(img.id)}
                              alt={img.name}
                              loading="lazy"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-1.5">
                              <p className="text-[9px] text-white truncate font-mono">{img.name}</p>
                              <button
                                onClick={() => handleTestDriveSpecimen(cls, img)}
                                className="mt-1 w-full py-1 rounded bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold text-[9px] flex items-center justify-center space-x-0.5"
                              >
                                <Play className="w-2.5 h-2.5 fill-current" />
                                <span>Test Scan</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 rounded-xl bg-slate-50 border border-dashed border-slate-300 text-center text-xs text-slate-500">
                        Class verified in dataset schema.
                      </div>
                    )}

                    {/* Key Diagnostic Features */}
                    <div className="pt-2 space-y-1">
                      <span className="text-[11px] font-bold text-slate-700">Dataset Ground-Truth Markers:</span>
                      <ul className="space-y-1 text-[11px] text-slate-600">
                        {cls.distinguishingFeatures.map((feat, i) => (
                          <li key={i} className="flex items-start space-x-1.5">
                            <span className="text-amber-500 mt-0.5">•</span>
                            <span className="leading-snug">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-4 bg-slate-50 border-t border-emerald-900/10 flex items-center justify-between">
                  <a
                    href={cls.driveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-emerald-800 hover:text-emerald-950 font-semibold flex items-center space-x-1"
                  >
                    <span>View in Drive</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  {cls.sampleImages.length > 0 && (
                    <button
                      onClick={() => handleTestDriveSpecimen(cls, cls.sampleImages[0])}
                      className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-emerald-950 font-extrabold text-xs flex items-center space-x-1.5 transition-all shadow-xs"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Test in Scanner</span>
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW MODE 2: BOTANICAL REFERENCE CARDS & DIAGNOSTIC RUBRIC */}
      {activeViewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDataset.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-emerald-900/10 rounded-2xl overflow-hidden shadow-md hover:border-amber-500/60 hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Leaf Thumbnail */}
                <div className="relative h-48 bg-emerald-50/20 overflow-hidden flex items-center justify-center p-2 border-b border-emerald-900/10">
                  <img
                    src={item.sampleImageUrl}
                    alt={item.diseaseName}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                  />
                  
                  <div className="absolute top-3 left-3 flex space-x-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-white/95 backdrop-blur-md text-emerald-900 text-[10px] font-bold border border-emerald-900/15 shadow-xs">
                      {item.crop}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-white/95 backdrop-blur-md text-slate-700 text-[10px] font-semibold border border-slate-200 shadow-xs">
                      {item.category}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold shadow-xs ${
                        item.severity === 'Severe'
                          ? 'bg-rose-50 text-rose-800 border border-rose-300'
                          : item.severity === 'Moderate'
                          ? 'bg-amber-50 text-amber-900 border border-amber-300'
                          : 'bg-emerald-50 text-emerald-900 border border-emerald-300'
                      }`}
                    >
                      {item.severity}
                    </span>
                  </div>
                </div>

                {/* Disease Info */}
                <div className="p-5 space-y-2">
                  <h3 className="text-base font-extrabold text-emerald-950 group-hover:text-emerald-800 transition-colors">
                    {item.diseaseName}
                  </h3>
                  <p className="text-xs italic text-slate-500">{item.scientificName}</p>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>

                  {/* Key Symptoms */}
                  <div className="pt-2 space-y-1">
                    <span className="text-[11px] font-bold text-slate-700">Key Diagnostic Markers:</span>
                    <div className="flex flex-wrap gap-1">
                      {item.keySymptoms.slice(0, 3).map((sym, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-50/60 text-emerald-950 border border-emerald-900/10 font-medium">
                          • {sym}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-4 bg-slate-50 border-t border-emerald-900/10 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-mono">ID: {item.id}</span>
                <button
                  onClick={() => onSelectSample(item)}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-emerald-950 font-extrabold text-xs flex items-center space-x-1.5 transition-all shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Run Diagnostic</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
