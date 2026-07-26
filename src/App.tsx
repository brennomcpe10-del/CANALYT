import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LivePixSection } from './components/LivePixSection';
import { VipStoreSection } from './components/VipStoreSection';
import { ScheduleSection } from './components/ScheduleSection';
import { NewsSection } from './components/NewsSection';
import { LinksSection } from './components/LinksSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { StreamerConfigModal } from './components/StreamerConfigModal';
import { RegisterModal } from './components/RegisterModal';
import { UserProfileModal } from './components/UserProfileModal';
import { AdminRestrictedModal } from './components/AdminRestrictedModal';

import { 
  defaultChannelInfo, 
  defaultVipPlans, 
  defaultNews, 
  defaultSchedule, 
  defaultFaq,
  defaultSocialLinks 
} from './data/defaultData';
import { ChannelInfo, ThemeAccent, VipPlan, NewsItem, ScheduleItem, FaqItem, SocialLink, UserProfile } from './types';
import { checkScheduleLiveStatus, ScheduleLiveStatus } from './utils/scheduleLiveHelper';
import { db, doc, setDoc, onSnapshot } from './lib/firebase';

export default function App() {
  // User Profile State (saved in localStorage)
  const [currentUserProfile, setCurrentUserProfile] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('nexus_user_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error loading saved user profile', e);
      }
    }
    return null;
  });

  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<boolean>(() => {
    const saved = localStorage.getItem('nexus_user_profile');
    return !saved;
  });

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAdminRestrictedModalOpen, setIsAdminRestrictedModalOpen] = useState(false);

  // Channel Info State

  const [channelInfo, setChannelInfo] = useState<ChannelInfo>(() => {
    const saved = localStorage.getItem('nexus_channel_info');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error loading saved channel info', e);
      }
    }
    return defaultChannelInfo;
  });

  // Simulated live test mode state (for 1 hour duration testing)
  const [simulatedLiveStartTime, setSimulatedLiveStartTime] = useState<Date | null>(() => {
    const saved = localStorage.getItem('nexus_simulated_live');
    return saved ? new Date(saved) : null;
  });

  // VIP Plans State
  const [vipPlans, setVipPlans] = useState<VipPlan[]>(() => {
    const saved = localStorage.getItem('nexus_vip_plans');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error loading saved VIP plans', e);
      }
    }
    return defaultVipPlans;
  });

  // Schedule State
  const [schedule, setSchedule] = useState<ScheduleItem[]>(() => {
    const saved = localStorage.getItem('nexus_schedule');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error loading saved schedule', e);
      }
    }
    return defaultSchedule;
  });

  // News State
  const [newsList, setNewsList] = useState<NewsItem[]>(() => {
    const saved = localStorage.getItem('nexus_news');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error loading saved news', e);
      }
    }
    return defaultNews;
  });

  // Social Links State
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(() => {
    const saved = localStorage.getItem('nexus_social_links');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error loading saved social links', e);
      }
    }
    return defaultSocialLinks;
  });

  // FAQ State
  const [faqList, setFaqList] = useState<FaqItem[]>(() => {
    const saved = localStorage.getItem('nexus_faq');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error loading saved FAQ', e);
      }
    }
    return defaultFaq;
  });

  const [activeAccent, setActiveAccent] = useState<ThemeAccent>('red');
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [initialConfigTab, setInitialConfigTab] = useState<'geral' | 'vip' | 'agenda' | 'noticias' | 'links' | 'faq'>('geral');

  // Real-time Firestore Listener for Global Site Configuration
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'channel_config', 'main_config'), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        if (data.channelInfo) {
          setChannelInfo(data.channelInfo);
          localStorage.setItem('nexus_channel_info', JSON.stringify(data.channelInfo));
        }
        if (data.vipPlans) {
          setVipPlans(data.vipPlans);
          localStorage.setItem('nexus_vip_plans', JSON.stringify(data.vipPlans));
        }
        if (data.schedule) {
          setSchedule(data.schedule);
          localStorage.setItem('nexus_schedule', JSON.stringify(data.schedule));
        }
        if (data.newsList) {
          setNewsList(data.newsList);
          localStorage.setItem('nexus_news', JSON.stringify(data.newsList));
        }
        if (data.socialLinks) {
          setSocialLinks(data.socialLinks);
          localStorage.setItem('nexus_social_links', JSON.stringify(data.socialLinks));
        }
        if (data.faqList) {
          setFaqList(data.faqList);
          localStorage.setItem('nexus_faq', JSON.stringify(data.faqList));
        }
      } else {
        // Seed initial document in Firestore if it doesn't exist yet
        setDoc(doc(db, 'channel_config', 'main_config'), {
          channelInfo,
          vipPlans,
          schedule,
          newsList,
          socialLinks,
          faqList,
          updatedAt: new Date().toISOString(),
        }, { merge: true }).catch(err => console.error('Error seeding initial Firestore config:', err));
      }
    }, (error) => {
      console.error('Error in Firestore real-time listener:', error);
    });

    return () => unsubscribe();
  }, []);

  // Handler to save ALL streamer modal config at once in a single Firestore atomic write
  const handleSaveAllConfig = async (data: {
    channelInfo: ChannelInfo;
    vipPlans: VipPlan[];
    schedule: ScheduleItem[];
    newsList: NewsItem[];
    socialLinks: SocialLink[];
    faqList: FaqItem[];
  }) => {
    setChannelInfo(data.channelInfo);
    setVipPlans(data.vipPlans);
    setSchedule(data.schedule);
    setNewsList(data.newsList);
    setSocialLinks(data.socialLinks);
    setFaqList(data.faqList);

    localStorage.setItem('nexus_channel_info', JSON.stringify(data.channelInfo));
    localStorage.setItem('nexus_vip_plans', JSON.stringify(data.vipPlans));
    localStorage.setItem('nexus_schedule', JSON.stringify(data.schedule));
    localStorage.setItem('nexus_news', JSON.stringify(data.newsList));
    localStorage.setItem('nexus_social_links', JSON.stringify(data.socialLinks));
    localStorage.setItem('nexus_faq', JSON.stringify(data.faqList));

    try {
      await setDoc(doc(db, 'channel_config', 'main_config'), {
        channelInfo: data.channelInfo,
        vipPlans: data.vipPlans,
        schedule: data.schedule,
        newsList: data.newsList,
        socialLinks: data.socialLinks,
        faqList: data.faqList,
        updatedAt: new Date().toISOString(),
      }, { merge: true });
    } catch (err) {
      console.error('Error saving channel_config to Firestore:', err);
    }
  };

  // Local Persistence Effects
  useEffect(() => {
    localStorage.setItem('nexus_channel_info', JSON.stringify(channelInfo));
  }, [channelInfo]);

  useEffect(() => {
    localStorage.setItem('nexus_vip_plans', JSON.stringify(vipPlans));
  }, [vipPlans]);

  useEffect(() => {
    localStorage.setItem('nexus_schedule', JSON.stringify(schedule));
  }, [schedule]);

  useEffect(() => {
    localStorage.setItem('nexus_news', JSON.stringify(newsList));
  }, [newsList]);

  useEffect(() => {
    localStorage.setItem('nexus_social_links', JSON.stringify(socialLinks));
  }, [socialLinks]);

  useEffect(() => {
    localStorage.setItem('nexus_faq', JSON.stringify(faqList));
  }, [faqList]);

  // Automatic 1-Hour Schedule Live Status Monitor
  useEffect(() => {
    const updateLiveStatusFromSchedule = () => {
      const liveStatus = checkScheduleLiveStatus(schedule, new Date(), simulatedLiveStartTime);

      setChannelInfo(prev => {
        const isLiveNow = liveStatus.isLive;
        const currentGame = liveStatus.isLive && liveStatus.activeItem 
          ? liveStatus.activeItem.game 
          : (prev.currentGame || 'GTA RP / Multijogador');
        const liveTitle = liveStatus.isLive && liveStatus.activeItem 
          ? `🔴 TRANSMISSÃO AO VIVO • ${liveStatus.activeItem.gameCategory || 'Gameplay'}` 
          : (prev.liveTitle || 'Lives quase todos os dias!');

        if (prev.isLiveNow !== isLiveNow || prev.currentGame !== currentGame || prev.liveTitle !== liveTitle) {
          return {
            ...prev,
            isLiveNow,
            currentGame,
            liveTitle
          };
        }
        return prev;
      });
    };

    updateLiveStatusFromSchedule();
    const interval = setInterval(updateLiveStatusFromSchedule, 1000);
    return () => clearInterval(interval);
  }, [schedule, simulatedLiveStartTime]);

  const handleStartSimulatedLive = () => {
    const now = new Date();
    setSimulatedLiveStartTime(now);
    localStorage.setItem('nexus_simulated_live', now.toISOString());
  };

  const handleStopSimulatedLive = () => {
    setSimulatedLiveStartTime(null);
    localStorage.removeItem('nexus_simulated_live');
  };

  // Helper to sync specific field changes to Firestore safely using merge
  const syncFieldToFirestore = async (partial: {
    channelInfo?: ChannelInfo;
    vipPlans?: VipPlan[];
    schedule?: ScheduleItem[];
    newsList?: NewsItem[];
    socialLinks?: SocialLink[];
    faqList?: FaqItem[];
  }) => {
    try {
      await setDoc(doc(db, 'channel_config', 'main_config'), {
        ...partial,
        updatedAt: new Date().toISOString(),
      }, { merge: true });
    } catch (err) {
      console.error('Error syncing partial update to Firestore:', err);
    }
  };

  // Handlers for Channel Info
  const handleSaveChannelInfo = (updated: ChannelInfo) => {
    setChannelInfo(updated);
    syncFieldToFirestore({ channelInfo: updated });
  };

  const handleResetChannelInfo = () => {
    setChannelInfo(defaultChannelInfo);
    localStorage.removeItem('nexus_channel_info');
    syncFieldToFirestore({ channelInfo: defaultChannelInfo });
  };

  // Handlers for VIP Plans
  const handleSaveVipPlans = (updatedPlans: VipPlan[]) => {
    setVipPlans(updatedPlans);
    syncFieldToFirestore({ vipPlans: updatedPlans });
  };

  const handleDeleteVipPlan = (id: string) => {
    const nextPlans = vipPlans.filter(p => p.id !== id);
    setVipPlans(nextPlans);
    syncFieldToFirestore({ vipPlans: nextPlans });
  };

  // Handlers for Schedule
  const handleSaveSchedule = (updatedSchedule: ScheduleItem[]) => {
    setSchedule(updatedSchedule);
    syncFieldToFirestore({ schedule: updatedSchedule });
  };

  const handleDeleteScheduleItem = (id: string) => {
    const nextSchedule = schedule.filter(s => s.id !== id);
    setSchedule(nextSchedule);
    syncFieldToFirestore({ schedule: nextSchedule });
  };

  // Handlers for News
  const handleSaveNews = (updatedNews: NewsItem[]) => {
    setNewsList(updatedNews);
    syncFieldToFirestore({ newsList: updatedNews });
  };

  const handleDeleteNewsItem = (id: string) => {
    const nextNews = newsList.filter(n => n.id !== id);
    setNewsList(nextNews);
    syncFieldToFirestore({ newsList: nextNews });
  };

  // Handlers for Social Links
  const handleSaveSocialLinks = (updatedLinks: SocialLink[]) => {
    setSocialLinks(updatedLinks);
    syncFieldToFirestore({ socialLinks: updatedLinks });
  };

  const handleDeleteSocialLink = (id: string) => {
    const nextLinks = socialLinks.filter(l => l.id !== id);
    setSocialLinks(nextLinks);
    syncFieldToFirestore({ socialLinks: nextLinks });
  };

  // Handlers for FAQ
  const handleSaveFaq = (updatedFaq: FaqItem[]) => {
    setFaqList(updatedFaq);
    syncFieldToFirestore({ faqList: updatedFaq });
  };

  const handleDeleteFaqItem = (id: string) => {
    const nextFaq = faqList.filter(f => f.id !== id);
    setFaqList(nextFaq);
    syncFieldToFirestore({ faqList: nextFaq });
  };

  // User Profile Handlers (Saved directly to Firestore users collection)
  const handleRegister = async (profile: UserProfile) => {
    setCurrentUserProfile(profile);
    localStorage.setItem('nexus_user_profile', JSON.stringify(profile));
    setIsRegisterModalOpen(false);

    try {
      const userDocId = profile.email.toLowerCase().trim().replace(/[^a-zA-Z0-9]/g, '_');
      await setDoc(doc(db, 'users', userDocId), {
        name: profile.name,
        email: profile.email.toLowerCase().trim(),
        minecraftNick: profile.minecraftNick || '',
        discordNametag: profile.discordNametag || '',
        registeredAt: profile.registeredAt || new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      }, { merge: true });
    } catch (err) {
      console.error('Error saving user profile to Firestore database:', err);
    }
  };

  const handleLogout = () => {
    setCurrentUserProfile(null);
    localStorage.removeItem('nexus_user_profile');
    setIsProfileModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const handleSwitchToAdmin = () => {
    setIsAdminRestrictedModalOpen(false);
    setIsProfileModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const openModalWithTab = (tab: 'geral' | 'vip' | 'agenda' | 'noticias' | 'links' | 'faq') => {
    if (!currentUserProfile) {
      setIsRegisterModalOpen(true);
      return;
    }

    if (currentUserProfile.email.toLowerCase() === 'brennomcpe10@gmail.com') {
      setInitialConfigTab(tab);
      setIsConfigOpen(true);
    } else {
      setIsAdminRestrictedModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-gray-100 font-sans selection:bg-red-500 selection:text-white">
      
      {/* User Registration Modal (Mandatory Gate) */}
      <RegisterModal
        isOpen={isRegisterModalOpen || !currentUserProfile}
        currentUserProfile={currentUserProfile}
        onRegister={handleRegister}
        isMandatory={!currentUserProfile}
      />

      {/* User Profile View / Edit Modal */}
      {currentUserProfile && (
        <UserProfileModal
          isOpen={isProfileModalOpen}
          userProfile={currentUserProfile}
          onClose={() => setIsProfileModalOpen(false)}
          onEditProfile={() => {
            setIsProfileModalOpen(false);
            setIsRegisterModalOpen(true);
          }}
          onLogout={handleLogout}
        />
      )}

      {/* Admin Access Restricted Modal */}
      <AdminRestrictedModal
        isOpen={isAdminRestrictedModalOpen}
        userEmail={currentUserProfile?.email || ''}
        onClose={() => setIsAdminRestrictedModalOpen(false)}
        onSwitchToAdmin={handleSwitchToAdmin}
      />

      {/* Navigation Bar */}
      <Navbar
        channelInfo={channelInfo}
        activeAccent={activeAccent}
        currentUserProfile={currentUserProfile}
        onAccentChange={setActiveAccent}
        onOpenStreamerConfig={() => openModalWithTab('geral')}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        onOpenAdminRestrictedModal={() => setIsAdminRestrictedModalOpen(true)}
      />

      {/* Main Sections */}
      <main>
        {/* 1. Página Inicial */}
        <Hero channelInfo={channelInfo} activeAccent={activeAccent} />

        {/* 2. Seção LivePix */}
        <LivePixSection channelInfo={channelInfo} />

        {/* 3. Loja VIP */}
        <VipStoreSection 
          vipPlans={vipPlans} 
          channelInfo={channelInfo}
          onManage={() => openModalWithTab('vip')}
          onDeletePlan={handleDeleteVipPlan}
        />

        {/* 4. Agenda de Lives */}
        <ScheduleSection 
          schedule={schedule} 
          channelInfo={channelInfo}
          onManage={() => openModalWithTab('agenda')}
          onDeleteSchedule={handleDeleteScheduleItem}
        />

        {/* 5. Notícias */}
        <NewsSection 
          newsList={newsList}
          onManage={() => openModalWithTab('noticias')}
          onDeleteNews={handleDeleteNewsItem}
        />

        {/* 6. Links */}
        <LinksSection 
          channelInfo={channelInfo}
          socialLinks={socialLinks}
          onManage={() => openModalWithTab('links')}
          onDeleteLink={handleDeleteSocialLink}
        />

        {/* 7. FAQ */}
        <FaqSection 
          faqList={faqList} 
          channelInfo={channelInfo}
          onManage={() => openModalWithTab('faq')}
          onDeleteFaq={handleDeleteFaqItem}
        />
      </main>

      {/* 8. Rodapé */}
      <Footer
        channelInfo={channelInfo}
        onOpenStreamerConfig={() => openModalWithTab('geral')}
      />

      {/* Streamer Configuration Admin Modal */}
      {isConfigOpen && (
        <StreamerConfigModal
          initialTab={initialConfigTab}
          channelInfo={channelInfo}
          vipPlans={vipPlans}
          schedule={schedule}
          newsList={newsList}
          socialLinks={socialLinks}
          faqList={faqList}
          simulatedLiveStartTime={simulatedLiveStartTime}
          onStartSimulatedLive={handleStartSimulatedLive}
          onStopSimulatedLive={handleStopSimulatedLive}
          onSaveAll={handleSaveAllConfig}
          onSaveChannelInfo={handleSaveChannelInfo}
          onResetChannelInfo={handleResetChannelInfo}
          onSaveVipPlans={handleSaveVipPlans}
          onSaveSchedule={handleSaveSchedule}
          onSaveNews={handleSaveNews}
          onSaveSocialLinks={handleSaveSocialLinks}
          onSaveFaq={handleSaveFaq}
          onClose={() => setIsConfigOpen(false)}
        />
      )}

    </div>
  );
}
